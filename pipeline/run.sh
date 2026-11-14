#!/usr/bin/env bash
# Point d'entrée unique, appelé par le Planificateur de tâches Windows via :
#   wsl.exe -d Ubuntu -- bash -lc '~/.openclaw/workspace/pipeline/run.sh dealhunter --publish'
# Usage : run.sh dealhunter [--publish] | run.sh expire [--apply]
# Logs  : ~/.openclaw/workspace/logs/<job>-AAAAMMJJ-HHMM.log
set -uo pipefail
JOB="${1:?usage: run.sh dealhunter|expire [options]}"; shift
BASE="$HOME/.openclaw/workspace"
ENV_FILE="$BASE/.env.dealhunter"
LOG_DIR="$BASE/logs"; mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/$JOB-$(date +%Y%m%d-%H%M).log"
log() { echo "$(date '+%F %T') $*" >>"$LOG"; }

# Un seul run à la fois.
exec 9>"$LOG_DIR/.$JOB.lock"
flock -n 9 || { log "déjà en cours : abandon"; exit 0; }

[ -r "$ENV_FILE" ] || { log "manque $ENV_FILE"; exit 2; }
if grep -qE '=(NOUVELLE|NOUVEAU|VOTRE)' "$ENV_FILE"; then
  log "$ENV_FILE contient encore des valeurs d'exemple : abandon"; exit 3
fi
set -a; . "$ENV_FILE"; set +a

# Pas de réseau = on ne tente rien (cause des échecs du 12/11/2026). On laisse 2 min au réseau de WSL.
for i in $(seq 1 12); do
  curl -sS --max-time 10 -o /dev/null "$SUPABASE_URL/rest/v1/" -H "apikey: $SUPABASE_SERVICE_KEY" && break
  [ "$i" = 12 ] && { log "Supabase injoignable : abandon"; exit 4; }
  sleep 10
done

case "$JOB" in
  dealhunter) script=dealhunter.py ;;
  expire)     script=expire.py ;;
  *) log "job inconnu : $JOB"; exit 1 ;;
esac
log "début $JOB $*"
python3 -I "$BASE/pipeline/$script" "$@" >>"$LOG" 2>&1
rc=$?
log "fin $JOB (code $rc)"
exit $rc
