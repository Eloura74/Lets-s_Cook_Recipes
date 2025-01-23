# Guide de Mise à Jour de Tailwind CSS

Ce guide explique comment vérifier et mettre à jour Tailwind CSS dans notre projet Vite + React.

## Vérification de la version actuelle

Pour vérifier la version actuelle de Tailwind CSS installée dans le projet :

```bash
npm list tailwindcss
```

Note : La commande `npx tailwindcss --version` est dépréciée et ne doit plus être utilisée.

## Procédure de mise à jour

1. **Mise à jour de Tailwind CSS et ses dépendances**
   ```bash
   npm install tailwindcss@latest postcss@latest autoprefixer@latest
   ```

2. **Vérification après mise à jour**
   ```bash
   npm list tailwindcss
   ```

3. **Redémarrage du serveur de développement**
   ```bash
   npm run dev
   ```

## Points importants

- Toujours sauvegarder vos modifications avant la mise à jour
- Vérifier la compatibilité des autres dépendances après la mise à jour
- Tester l'application après la mise à jour pour s'assurer que tout fonctionne correctement

## Ressources utiles

- [Documentation officielle de Tailwind CSS](https://tailwindcss.com/docs)
- [Guide d'installation avec Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Blog Tailwind CSS](https://tailwindcss.com/blog) pour suivre les nouvelles versions

## Dernière mise à jour

- Version actuelle : Tailwind CSS 4.0.0
- Date de mise à jour : 23 janvier 2025
