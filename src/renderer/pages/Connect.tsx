import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from 'component-lib';

import './Connect.scss';

function Connect() {
  const navigate = useNavigate();

  return (
    <div className='connect-page'>
      <div className='content'>
        <div className='wrapper'>
          <div>
            <p className='title'>
              Welcome to <span className='name'>League Tools</span>
            </p>
            <p className='subtitle'>
              Start by connecting to your League of Legends client
            </p>
          </div>
          <div className='button-wrapper'>
            <Button
              variant='primary'
              title='Connect'
              onClick={() => navigate('/home')}
            />
            <Button variant='secondary' title='Functions -->' />
          </div>
        </div>
        <div className='preview'></div>
      </div>
      <span className='version'>v.2.0.0</span>
      <svg
        className='wave'
        viewBox='0 0 1440 490'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <linearGradient id='gradient-0' x1='0' x2='0' y1='1' y2='0'>
            <stop stopColor='#432573' offset='0%'></stop>
            <stop stopColor='#7128CE' offset='100%'></stop>
          </linearGradient>
        </defs>
        <path
          fill='url(#gradient-0)'
          d='M0,49L40,98C80,147,160,245,240,261.3C320,278,400,212,480,228.7C560,245,640,343,720,367.5C800,392,880,343,960,310.3C1040,278,1120,261,1200,236.8C1280,212,1360,180,1440,155.2C1520,131,1600,114,1680,147C1760,180,1840,261,1920,261.3C2000,261,2080,180,2160,179.7C2240,180,2320,261,2400,310.3C2480,359,2560,376,2640,392C2720,408,2800,425,2880,408.3C2960,392,3040,343,3120,334.8C3200,327,3280,359,3360,326.7C3440,294,3520,196,3600,163.3C3680,131,3760,163,3840,179.7C3920,196,4000,196,4080,204.2C4160,212,4240,229,4320,236.8C4400,245,4480,245,4560,277.7C4640,310,4720,376,4800,383.8C4880,392,4960,343,5040,277.7C5120,212,5200,131,5280,122.5C5360,114,5440,180,5520,220.5C5600,261,5680,278,5720,285.8L5760,294L5760,490L5720,490C5680,490,5600,490,5520,490C5440,490,5360,490,5280,490C5200,490,5120,490,5040,490C4960,490,4880,490,4800,490C4720,490,4640,490,4560,490C4480,490,4400,490,4320,490C4240,490,4160,490,4080,490C4000,490,3920,490,3840,490C3760,490,3680,490,3600,490C3520,490,3440,490,3360,490C3280,490,3200,490,3120,490C3040,490,2960,490,2880,490C2800,490,2720,490,2640,490C2560,490,2480,490,2400,490C2320,490,2240,490,2160,490C2080,490,2000,490,1920,490C1840,490,1760,490,1680,490C1600,490,1520,490,1440,490C1360,490,1280,490,1200,490C1120,490,1040,490,960,490C880,490,800,490,720,490C640,490,560,490,480,490C400,490,320,490,240,490C160,490,80,490,40,490L0,490Z'
        ></path>
      </svg>
      <svg
        className='wave second'
        viewBox='0 0 1440 490'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <linearGradient id='gradient-1' x1='0' x2='0' y1='1' y2='0'>
            <stop stopColor='rgba(116, 79, 176, 0.3)' offset='0%'></stop>
            <stop stopColor='rgba(65, 53, 80, 0.3)' offset='100%'></stop>
          </linearGradient>
        </defs>
        <path
          fill='url(#gradient-1)'
          d='M0,49L40,98C80,147,160,245,240,261.3C320,278,400,212,480,228.7C560,245,640,343,720,367.5C800,392,880,343,960,310.3C1040,278,1120,261,1200,236.8C1280,212,1360,180,1440,155.2C1520,131,1600,114,1680,147C1760,180,1840,261,1920,261.3C2000,261,2080,180,2160,179.7C2240,180,2320,261,2400,310.3C2480,359,2560,376,2640,392C2720,408,2800,425,2880,408.3C2960,392,3040,343,3120,334.8C3200,327,3280,359,3360,326.7C3440,294,3520,196,3600,163.3C3680,131,3760,163,3840,179.7C3920,196,4000,196,4080,204.2C4160,212,4240,229,4320,236.8C4400,245,4480,245,4560,277.7C4640,310,4720,376,4800,383.8C4880,392,4960,343,5040,277.7C5120,212,5200,131,5280,122.5C5360,114,5440,180,5520,220.5C5600,261,5680,278,5720,285.8L5760,294L5760,490L5720,490C5680,490,5600,490,5520,490C5440,490,5360,490,5280,490C5200,490,5120,490,5040,490C4960,490,4880,490,4800,490C4720,490,4640,490,4560,490C4480,490,4400,490,4320,490C4240,490,4160,490,4080,490C4000,490,3920,490,3840,490C3760,490,3680,490,3600,490C3520,490,3440,490,3360,490C3280,490,3200,490,3120,490C3040,490,2960,490,2880,490C2800,490,2720,490,2640,490C2560,490,2480,490,2400,490C2320,490,2240,490,2160,490C2080,490,2000,490,1920,490C1840,490,1760,490,1680,490C1600,490,1520,490,1440,490C1360,490,1280,490,1200,490C1120,490,1040,490,960,490C880,490,800,490,720,490C640,490,560,490,480,490C400,490,320,490,240,490C160,490,80,490,40,490L0,490Z'
        ></path>
      </svg>
    </div>
  );
}

export default Connect;
