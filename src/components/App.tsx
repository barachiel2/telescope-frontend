import React from 'react';
import Header from './Header';
import Footer from './Footer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main className="p-4">
        <h2 className="text-2xl font-bold">Welcome to Telescope Portfolio Manager</h2>
      </main>
      <Footer />
    </div>
  );
};

export default App;
