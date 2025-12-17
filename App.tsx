import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { HomeView } from './views/HomeView';
import { InventoryView } from './views/InventoryView';
import { FuelView } from './views/FuelView';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';
import { LoadingOverlay } from './components/LoadingOverlay';
import { TxType, SimType } from './types';

const MainApp: React.FC = () => {
  const [activeView, setActiveView] = useState('home');
  const { db, updateDb, currentDate, isSyncing } = useApp();

  const handleSell = (type: TxType, price: number, qty: number) => {
    const newTx = {
      id: Date.now(),
      date: currentDate.toISOString(),
      type,
      amt: price,
      sims: qty
    };

    const newDb = { ...db };
    
    // Decrease stock if not 'issue'
    if (type !== 'issue') {
        newDb.stock[type as SimType] -= qty;
    }

    newDb.tx.push(newTx);
    updateDb(newDb);
  };

  const renderView = () => {
    switch (activeView) {
      case 'home': return <HomeView onSell={handleSell} />;
      case 'inventory': return <InventoryView />;
      case 'fuel': return <FuelView />;
      case 'reports': return <ReportsView />;
      case 'settings': return <SettingsView />;
      default: return <HomeView onSell={handleSell} />;
    }
  };

  return (
    <>
      <LoadingOverlay isLoading={isSyncing} />
      <Layout activeView={activeView} setActiveView={setActiveView}>
        <div className="animate-in fade-in duration-300">
          {renderView()}
        </div>
      </Layout>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
};

export default App;
