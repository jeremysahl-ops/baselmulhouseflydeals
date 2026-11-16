import { notFound } from 'next/navigation';

// Toute adresse qui ne correspond à aucune page affiche la page 404 du site (dans la bonne langue).
export default function CatchAll() {
  notFound();
}
