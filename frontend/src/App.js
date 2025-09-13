import React, { useState } from 'react';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Form onGetRecommendations={setRecommendations} />
            </div>
          </div>

          <div className="lg:col-span-3">
            <RecommendationList recommendations={recommendations} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
