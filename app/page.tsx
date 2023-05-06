"use client";
import Image from 'next/image';
import '../styles/page.scss';
import SystemService from './services/system.service';
import { useState } from 'react';

export default function Home() {
  const systemService: SystemService = new SystemService();
  const [inputScript, setInputScript] = useState("PLACE_ROBOT 2,2,WEST\n" +
    "PLACE_WALL 1,1\n" +
    "PLACE_WALL 2,2\n" +
    "PLACE_WALL 1,3\n" +
    "LEFT\n" +
    "LEFT\n" +
    "MOVE\n" +
    "REPORT");
  const [reportData, setReportData] = useState('');

  const result = () => {
    systemService.clear();
    systemService.parseCommandScript(inputScript);
    setReportData(systemService.reportData);
  }

  const inputScriptChange = (event: any) => {
    setInputScript(event.target.value);
  }

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="h1">Toy Robot App</h1>
        <h2 className="h2">Place the robot, build walls and move around!</h2>
        <Image width={128} height={128} className="robot" src="/robot.png" alt="Robot" />
      </header>
      <main className="main">
        <div className="form-container">
          <label htmlFor="command-script"></label>
          <textarea className="textarea" name="" id="command-script" value={inputScript} onChange={inputScriptChange} />
        </div>
        <div className="form-container">
          <button className="button" onClick={result}>Get result</button>
        </div>
        <div className="form-container">
          Result:
          <div className="result"><code>{reportData}</code></div>
        </div>
      </main>
      <footer className="footer">
        <p>Latest Next.js version since May 2023. Started in October, 2021.<br />
        Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
      </footer>
    </div>
  );
}
