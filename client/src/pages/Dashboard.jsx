import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-gray-700 text-center mb-6">Welcome to the Art Career Insights Dashboard</h1>

      <div className="flex justify-center">
      <iframe title="Harshitha_Dashbboard (3)" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiZTk3NDE0MjItZTFiYi00YjVhLWJhOWQtN2JlMWRhYjQ3ODhiIiwidCI6IjgzYzE3ZDkwLTU4MzItNDhiOS04ZWYyLWIyMGY3NjJlYWZiNSIsImMiOjN9" frameborder="0" allowFullScreen="true"></iframe>
      </div>
    </div>
  );
};

export default Dashboard;
