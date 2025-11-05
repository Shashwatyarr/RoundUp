import React from 'react';

// --- 1. STYLING (CSS) ---
// Humne CSS ko seedha ek <style> tag mein daal diya hai
const LeaderboardStyles = () => (
  <style>{`
    .leaderboard-container {
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      font-family: Arial, sans-serif;
    }

    .leaderboard-container h1 {
      text-align: center;
      color: #333;
      margin-bottom: 10px;
    }
    .leaderboard-container h1 .fa-ranking-star {
      color: #f39c12;
    }
    .leaderboard-container p {
      text-align: center;
      color: #777;
      margin-bottom: 30px;
    }

    .leaderboard-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .leaderboard-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
      margin-bottom: 12px;
      transition: all 0.3s ease;
    }

    .leaderboard-item:hover {
      transform: scale(1.02);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .leaderboard-item.rank-1 { background-color: #fffaf0; border: 1px solid #FFD700; }
    .leaderboard-item.rank-2 { background-color: #fdfdfd; border: 1px solid #C0C0C0; }
    .leaderboard-item.rank-3 { background-color: #fff8f2; border: 1px solid #CD7F32; }


    .rank-section {
      flex-basis: 15%;
      font-size: 1.4em;
      font-weight: bold;
      color: #555;
      text-align: center;
    }
    .rank-section .fas.fa-trophy {
      font-size: 1.6em;
    }

    .user-info {
      flex-basis: 55%;
      display: flex;
      align-items: center;
      font-size: 1.1em;
      color: #333;
    }

    .user-info .fa-user-circle {
      font-size: 1.8em;
      color: #aaa;
      margin-right: 15px;
    }
    .user-info .name {
      font-weight: 600;
    }

    .amount-section {
      flex-basis: 30%;
      text-align: right;
    }

    .amount-section .amount {
      font-size: 1.2em;
      font-weight: bold;
      color: #27ae60;
    }
  `}</style>
);


// --- 2. LIST ITEM COMPONENT ---
// Humne LeaderboardItem ko bhi isi file mein move kar diya
// (Note: isse 'export' karne ki zaroorat nahi hai)

const getRankIcon = (rank) => {
  if (rank === 1) {
    return <i className="fas fa-trophy" style={{ color: '#FFD700' }}></i>; // Gold
  }
  if (rank === 2) {
    return <i className="fas fa-trophy" style={{ color: '#C0C0C0' }}></i>; // Silver
  }
  if (rank === 3) {
    return <i className="fas fa-trophy" style={{ color: '#CD7F32' }}></i>; // Bronze
  }
  return <span className="rank-number">#{rank}</span>;
};

const LeaderboardItem = ({ user, rank }) => {
  const itemClasses = [
    'leaderboard-item',
    rank === 1 ? 'rank-1' : '',
    rank === 2 ? 'rank-2' : '',
    rank === 3 ? 'rank-3' : '',
  ].join(' ');

  return (
    <li className={itemClasses}>
      <div className="rank-section">
        {getRankIcon(rank)}
      </div>
      <div className="user-info">
        <i className="fa-solid fa-user-circle"></i>
        <span className="name">{user.name}</span>
      </div>
      <div className="amount-section">
        <span className="amount">
          ₹{user.amount.toLocaleString('en-IN')}
        </span>
      </div>
    </li>
  );
};


// --- 3. MAIN LEADERBOARD COMPONENT ---
// Yeh aapka main component hai
function Leaderboard() {
  
  const dummyUsers = [
    { name: "Priya Sharma", amount: 7500 },
    { name: "Rohan Gupta", amount: 5200 },
    { name: "Aarav Singh", amount: 12000 },
    { name: "Sanya Verma", amount: 3000 },
    { name: "Vikram Rathore", amount: 800 },
    { name: "Meera Reddy", amount: 4100 },
  ];

  const topDonators = dummyUsers.sort((a, b) => b.amount - a.amount);

  return (
    <>
      <LeaderboardStyles /> {/* <-- 1. CSS ko yahaan render karein */}
      
      <div className="leaderboard-container">
        <h1><i className="fa-solid fa-ranking-star"></i> Top Donators Leaderboard</h1>
        <p>Un champions ko dekhein jo sabse zyaada contribute kar rahe hain!</p>
        
        <ul className="leaderboard-list">
          {topDonators.map((user, index) => (
            <LeaderboardItem 
              key={user.name}
              user={user} 
              rank={index + 1}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default Leaderboard;