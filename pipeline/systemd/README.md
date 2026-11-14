# Planification sans LLM (systemd --user, dans WSL)

Pourquoi : les crons OpenClaw lancent un **agent LLM** qui, en session cron isolée, ne charge pas
`agents/*/agent.md`. `/expire` répondait « pas de définition pour /expire », et le pipeline
deals partait en timeout (environ 10 min) à chaque run depuis le 20/04/2026. Ici, systemd lance
directement les scripts testés.

## Installation (après rotation des clés et exécution du SQL)

```bash
REPO=/mnt/c/chemin/vers/baselmulhouseflydeals   # à adapter
mkdir -p ~/.openclaw/workspace/pipeline ~/.config/systemd/user
cp $REPO/pipeline/dealhunter.py $REPO/pipeline/expire.py ~/.openclaw/workspace/pipeline/
cp $REPO/pipeline/.env.example ~/.openclaw/workspace/.env.dealhunter
chmod 600 ~/.openclaw/workspace/.env.dealhunter     # puis y mettre les NOUVELLES clés
cp $REPO/pipeline/systemd/*.service $REPO/pipeline/systemd/*.timer ~/.config/systemd/user/

# Vérifier à blanc d'abord :
set -a; . ~/.openclaw/workspace/.env.dealhunter; set +a
python3 ~/.openclaw/workspace/pipeline/expire.py
python3 ~/.openclaw/workspace/pipeline/dealhunter.py

systemctl --user daemon-reload
systemctl --user enable --now dealhunter.timer expire.timer
systemctl --user list-timers
```

Logs : `journalctl --user -u dealhunter -u expire --since today`.
Run manuel : `systemctl --user start dealhunter.service`.

⚠️ Prérequis : systemd doit être actif dans WSL (`[boot]` + `systemd=true` dans `/etc/wsl.conf`).
Les timers ne tournent que si WSL est démarré. Pour que WSL reste actif sans terminal ouvert,
ajouter `vmIdleTimeout=-1` sous `[wsl2]` dans `%USERPROFILE%\.wslconfig`, ou lancer le
pipeline ailleurs (Planificateur de tâches Windows, GitHub Actions, VPS).

Une fois les timers validés, laisser désactivés les crons OpenClaw `d0878c19` (dealhunter)
et `d72e094c` (expire), pour ne pas publier en double.
