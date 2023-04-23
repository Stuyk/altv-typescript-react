import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { WebViewEvents } from '../../src/core/shared/webviewEvents';

function App() {
    const [count, setCount] = useState(0);
    const [isVisible, setVisibility] = useState(false);

    function invokeEvent() {
        console.log('Test!');

        if ('alt' in window) {
            alt.emit('emitToClient');
        }
    }

    useEffect(() => {
        if (!alt) {
            return;
        }

        alt.on(WebViewEvents.toggleVisibility, (shouldBeVisible: boolean) => {
            setVisibility(shouldBeVisible);
        });
    }, []);

    return (
        <div className={isVisible ? '' : 'hide'}>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <button onClick={invokeEvent}>Test!</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </div>
    );
}

export default App;
