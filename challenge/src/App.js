import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';

const MILESTONES = {
  TINY: 10,
  SMALL: 50,
  MODEST: 150,
  GROWING: 300,
  BUSY: 600,
  THRIVING: 1200,
  MASSIVE: 2500,
  LEGENDARY: 5000,
  MYTHICAL: 10000
};

const UPGRADE_COSTS = {
  CRANE: 25,
  DOCK: 100,
  WAREHOUSE: 250,
  LIGHTHOUSE: 500,
  FLEET: 1000,
  Harbour_MASTER: 2000,
  OCTOPUS: 4000
};

function App() {
  const [containers, setContainers] = useState(0);
  const [totalShipped, setTotalShipped] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoRate, setAutoRate] = useState(0.5);
  const [upgrades, setUpgrades] = useState({
    cranes: 0,
    docks: 0,
    warehouses: 0,
    lighthouse: false,
    fleet: 0,
    HarbourMaster: false,
    octopus: false
  });
  const [timeOfDay, setTimeOfDay] = useState('dawn');
  const [weather, setWeather] = useState('clear');
  const [achievements, setAchievements] = useState([]);
  const [showPrestige, setShowPrestige] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioContextRef = useRef(null);
  const oceanSoundRef = useRef(null);

  // Initialize audio on first user interaction
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create simple ocean sound
      if (!oceanSoundRef.current) {
        oceanSoundRef.current = new Audio();
        oceanSoundRef.current.loop = true;
        oceanSoundRef.current.volume = 0.15;
        oceanSoundRef.current.src = '/sound_effects/ocean.wav';      }
    }
    setSoundEnabled(true);
  }, []);

  // Play sound effect
  const playSound = useCallback((type) => {
    if (!soundEnabled || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    switch(type) {
      case 'click':
        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
        break;
        
      case 'ship':
        oscillator.frequency.setValueAtTime(150, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
        break;
        
      case 'upgrade':
        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        oscillator.frequency.setValueAtTime(600, ctx.currentTime + 0.05);
        oscillator.frequency.setValueAtTime(800, ctx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
        break;
        
      case 'achievement':
        oscillator.frequency.setValueAtTime(523, ctx.currentTime);
        oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.4);
        break;
        
      default:
        break;
    }
  }, [soundEnabled]);

// Toggle ambient ocean sound
useEffect(() => {
  if (soundEnabled && oceanSoundRef.current) {
    oceanSoundRef.current.play().catch(e => console.log('Audio play failed:', e));
  } else if (!soundEnabled && oceanSoundRef.current) {
    oceanSoundRef.current.pause();
  }
}, [soundEnabled]);

  // Auto-generate containers
  useEffect(() => {
    const interval = setInterval(() => {
      setContainers(prev => prev + autoRate);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoRate]);

  // Time of day cycle
  useEffect(() => {
    const times = ['dawn', 'morning', 'noon', 'afternoon', 'evening', 'night'];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % times.length;
      setTimeOfDay(times[index]);
    }, 15000); // Change every 15 seconds
    return () => clearInterval(interval);
  }, []);

  // Weather system
  useEffect(() => {
    const weathers = ['clear', 'cloudy', 'rainy', 'foggy', 'stormy', 'clear', 'clear', 'clear'];
    const interval = setInterval(() => {
      const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
      setWeather(randomWeather);
    }, 20000); // Change every 20 seconds
    return () => clearInterval(interval);
  }, []);

  // Check for milestones and achievements
  useEffect(() => {
    const checkAchievements = () => {
      const newAchievements = [];
      
      if (totalShipped >= MILESTONES.TINY && !achievements.includes('First Shipment')) {
        newAchievements.push('First Shipment');
      }
      if (totalShipped >= MILESTONES.SMALL && !achievements.includes('Harbour Apprentice')) {
        newAchievements.push('Harbour Apprentice');
      }
      if (totalShipped >= MILESTONES.MODEST && !achievements.includes('Container Enthusiast')) {
        newAchievements.push('Container Enthusiast');
      }
      if (totalShipped >= MILESTONES.GROWING && !achievements.includes('Port Operator')) {
        newAchievements.push('Port Operator');
      }
      if (totalShipped >= MILESTONES.BUSY && !achievements.includes('Shipping Tycoon')) {
        newAchievements.push('Shipping Tycoon');
      }
      if (totalShipped >= MILESTONES.THRIVING && !achievements.includes('Harbour Master')) {
        newAchievements.push('Harbour Master');
      }
      if (totalShipped >= MILESTONES.MASSIVE && !achievements.includes('Port Legend')) {
        newAchievements.push('Port Legend');
      }
      if (totalShipped >= MILESTONES.LEGENDARY && !achievements.includes('Container Deity')) {
        newAchievements.push('Container Deity');
      }
      
      if (newAchievements.length > 0) {
        setAchievements(prev => [...prev, ...newAchievements]);
        playSound('achievement');
      }

      // Show prestige option
      if (totalShipped >= MILESTONES.MASSIVE) {
        setShowPrestige(true);
      }
    };

    checkAchievements();
  }, [totalShipped, achievements, playSound]);

  const handleClick = () => {
    if (!soundEnabled) {
      initAudio();
    }
    setContainers(prev => prev + clickPower);
    playSound('click');
  };

  const shipContainers = () => {
    if (containers >= 10) {
      const toShip = Math.floor(containers / 10) * 10;
      setContainers(prev => prev - toShip);
      setTotalShipped(prev => prev + toShip);
      playSound('ship');
    }
  };

  const buyUpgrade = (type) => {
    let cost = 0;
    let canBuy = false;

    switch(type) {
      case 'crane':
        cost = UPGRADE_COSTS.CRANE * (upgrades.cranes + 1);
        canBuy = totalShipped >= cost;
        if (canBuy) {
          setUpgrades(prev => ({ ...prev, cranes: prev.cranes + 1 }));
          setClickPower(prev => prev + 2);
          setTotalShipped(prev => prev - cost);
          playSound('upgrade');
        }
        break;
      case 'dock':
        cost = UPGRADE_COSTS.DOCK * (upgrades.docks + 1);
        canBuy = totalShipped >= cost;
        if (canBuy) {
          setUpgrades(prev => ({ ...prev, docks: prev.docks + 1 }));
          setAutoRate(prev => prev + 0.5);
          setTotalShipped(prev => prev - cost);
          playSound('upgrade');
        }
        break;
      case 'warehouse':
        cost = UPGRADE_COSTS.WAREHOUSE * (upgrades.warehouses + 1);
        canBuy = totalShipped >= cost;
        if (canBuy) {
          setUpgrades(prev => ({ ...prev, warehouses: prev.warehouses + 1 }));
          setAutoRate(prev => prev + 1);
          setTotalShipped(prev => prev - cost);
          playSound('upgrade');
        }
        break;
      case 'lighthouse':
        cost = UPGRADE_COSTS.LIGHTHOUSE;
        canBuy = totalShipped >= cost && !upgrades.lighthouse;
        if (canBuy) {
          setUpgrades(prev => ({ ...prev, lighthouse: true }));
          setClickPower(prev => prev * 2);
          setTotalShipped(prev => prev - cost);
          playSound('upgrade');
        }
        break;
      case 'fleet':
        cost = UPGRADE_COSTS.FLEET * (upgrades.fleet + 1);
        canBuy = totalShipped >= cost;
        if (canBuy) {
          setUpgrades(prev => ({ ...prev, fleet: prev.fleet + 1 }));
          setAutoRate(prev => prev + 2);
          setTotalShipped(prev => prev - cost);
          playSound('upgrade');
        }
        break;
      case 'HarbourMaster':
        cost = UPGRADE_COSTS.Harbour_MASTER;
        canBuy = totalShipped >= cost && !upgrades.HarbourMaster;
        if (canBuy) {
          setUpgrades(prev => ({ ...prev, HarbourMaster: true }));
          setAutoRate(prev => prev * 1.5);
          setTotalShipped(prev => prev - cost);
          playSound('upgrade');
        }
        break;
      case 'octopus':
        cost = UPGRADE_COSTS.OCTOPUS;
        canBuy = totalShipped >= cost && !upgrades.octopus;
        if (canBuy) {
          setUpgrades(prev => ({ ...prev, octopus: true }));
          setAutoRate(prev => prev * 2);
          setClickPower(prev => prev * 2);
          setTotalShipped(prev => prev - cost);
          playSound('achievement');
        }
        break;
      default:
        break;
    }
  };

  const prestige = () => {
    const bonus = Math.floor(totalShipped / 1000);
    setContainers(0);
    setTotalShipped(0);
    setClickPower(1 + bonus);
    setAutoRate(0.5 + (bonus * 0.2));
    setUpgrades({
      cranes: 0,
      docks: 0,
      warehouses: 0,
      lighthouse: false,
      fleet: 0,
      HarbourMaster: false,
      octopus: false
    });
    setShowPrestige(false);
  };

  const getContainerHeight = () => {
    const height = Math.min(containers / 5, 100);
    return `${height}%`;
  };

  const getShipCount = () => {
    return Math.min(Math.floor(totalShipped / 100), 15);
  };

  const getHarbourMood = () => {
    if (totalShipped >= MILESTONES.MYTHICAL) return 'divine';
    if (totalShipped >= MILESTONES.LEGENDARY) return 'legendary';
    if (totalShipped >= MILESTONES.MASSIVE) return 'massive';
    if (totalShipped >= MILESTONES.THRIVING) return 'thriving';
    if (totalShipped >= MILESTONES.BUSY) return 'busy';
    if (totalShipped >= MILESTONES.GROWING) return 'growing';
    if (totalShipped >= MILESTONES.MODEST) return 'modest';
    if (totalShipped >= MILESTONES.SMALL) return 'small';
    if (totalShipped >= MILESTONES.TINY) return 'tiny';
    return 'quiet';
  };

  return (
    <div className={`App ${timeOfDay} ${weather}`}>
      <button 
        className="sound-toggle"
        onClick={() => {
          if (!soundEnabled) {
            initAudio();
          } else {
            setSoundEnabled(false);
          }
        }}
        title={soundEnabled ? "Mute sounds" : "Enable sounds"}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>
      
      <header className="header">
        <h1>🚢 CONTAINER Harbour 🚢</h1>
        <div className="subtitle">A Harbour That Remembers You</div>
      </header>

      <main className="main-content">
        <section className="Harbour-view">
          <div className="click-area" onClick={handleClick}>
            <div className="container-stack" style={{ height: getContainerHeight() }}>
              {containers >= 1 && (
                <div className="containers-visual">
                  {Array.from({ length: Math.min(Math.floor(containers / 10), 20) }).map((_, i) => (
                    <div key={i} className="container-row" />
                  ))}
                </div>
              )}
            </div>
            <div className="Harbour-ground">
              <div className="click-prompt">⬆️ Click to load containers ⬆️</div>
            </div>
          </div>

          <div className="ships-area">
            {Array.from({ length: getShipCount() }).map((_, i) => (
              <span key={i} className="ship">🚢</span>
            ))}
          </div>

          {upgrades.octopus && (
            <div className="linky-mascot">
              🐙 Linky is helping!
            </div>
          )}
        </section>

        <section className="controls">
          <button 
            className="ship-button" 
            onClick={shipContainers}
            disabled={containers < 10}
          >
            📦 Ship Containers Out 📦
          </button>

          <div className="upgrades-section">
            <h3>🏗️ Harbour Upgrades</h3>
            
            <button 
              className="upgrade-btn"
              onClick={() => buyUpgrade('crane')}
            >
              🏗️ Add Crane {upgrades.cranes > 0 && `(${Array(upgrades.cranes).fill('✓').join('')})`}
            </button>

            <button 
              className="upgrade-btn"
              onClick={() => buyUpgrade('dock')}
            >
              ⚓ Build Dock {upgrades.docks > 0 && `(${Array(upgrades.docks).fill('✓').join('')})`}
            </button>

            <button 
              className="upgrade-btn"
              onClick={() => buyUpgrade('warehouse')}
            >
              🏭 Warehouse {upgrades.warehouses > 0 && `(${Array(upgrades.warehouses).fill('✓').join('')})`}
            </button>

            {totalShipped >= 400 && (
              <button 
                className="upgrade-btn special"
                onClick={() => buyUpgrade('lighthouse')}
                disabled={upgrades.lighthouse}
              >
                🗼 Lighthouse {upgrades.lighthouse && '✓'}
              </button>
            )}

            {totalShipped >= 800 && (
              <button 
                className="upgrade-btn"
                onClick={() => buyUpgrade('fleet')}
              >
                ⛴️ Expand Fleet {upgrades.fleet > 0 && `(${Array(upgrades.fleet).fill('✓').join('')})`}
              </button>
            )}

            {totalShipped >= 1500 && (
              <button 
                className="upgrade-btn special"
                onClick={() => buyUpgrade('HarbourMaster')}
                disabled={upgrades.HarbourMaster}
              >
                👨‍✈️ Harbour Master {upgrades.HarbourMaster && '✓'}
              </button>
            )}

            {totalShipped >= 3000 && (
              <button 
                className="upgrade-btn special octopus-btn"
                onClick={() => buyUpgrade('octopus')}
                disabled={upgrades.octopus}
              >
                🐙 Summon Linky {upgrades.octopus && '✓'}
              </button>
            )}
          </div>

          {showPrestige && (
            <div className="prestige-section">
              <button className="prestige-btn" onClick={prestige}>
                ⚡ NEW VOYAGE ⚡<br/>
                <small>Start fresh with enhanced capabilities</small>
              </button>
            </div>
          )}
        </section>

        <section className="achievements">
          <h3>🏆 Achievements</h3>
          <div className="achievement-list">
            {achievements.map((achievement, i) => (
              <div key={i} className="achievement-badge">
                🏅 {achievement}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-info">
          Built with 💙 • Vibelympics 2026
        </div>
      </footer>
    </div>
  );
}

export default App;