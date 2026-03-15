# Expense Tracker

Egy egyszerű bevétel- és kiadáskövetős alkalmazás, amit React tanuláshoz készítettem.

## Funkciók

- Kiadás és bevétel hozzáadása (név, összeg, cég, kategória)
- Tételek szerkesztése és törlése
- Szűrés: összes / bevétel / kiadás
- Aktuális egyenleg megjelenítése (zöld ha pozitív, piros ha negatív)
- Adatok mentése böngészőbe (localStorage), így frissítés után sem vesznek el

## Technológiák

- **React 19** – UI felépítése
- **TypeScript** – típusbiztos kód
- **Vite** – gyors fejlesztői szerver és build eszköz
- **Tailwind CSS v4** – stílusok
- **shadcn/ui** – előre elkészített UI komponensek (Button, Dialog, Select stb.)
- **React Hook Form** – form kezelés és validáció
- **Sonner** – toast értesítések
- **useReducer** – állapotkezelés

## Indítás

```bash
# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm run dev
```

Az alkalmazás elérhető lesz: `http://localhost:5173`

## Egyéb parancsok

```bash
npm run build    # Production build készítése
npm run preview  # Build előnézete lokálisan
npm run lint     # ESLint futtatása
```

## Projekt struktúra

```
src/
├── components/
│   ├── form/
│   │   └── ExpenseForm.tsx   # Kiadás/bevétel hozzáadása és szerkesztése
│   ├── ui/                   # shadcn/ui komponensek
│   ├── ExpenseList.tsx       # Tételek listája
│   └── CancelAlertDialog.tsx # Törlés megerősítő dialógus
├── types/
│   └── type.ts               # TypeScript típusok
├── reducer.ts                # useReducer logika (add, update, delete)
├── constants.ts              # Kategóriák listája
└── App.tsx                   # Fő komponens
```
