 "use client";

import { useEffect, useRef, useState } from "react";

type Round = { id: number; multiplier: number; time: string };

export default function Home() {
  const [multiplier, setMultiplier] = useState(1);
  const [status, setStatus] = useState<"ready" | "running" | "crashed" | "cashed">("ready");
  const [credit, setCredit] = useState(1000);
  const [stake, setStake] = useState(50);
  const [activeStake, setActiveStake] = useState(0);
  const [rounds, setRounds] = useState<Round[]>([
    { id: 3245, multiplier: 2.17, time: "همین حالا" },
    { id: 3244, multiplier: 1.32, time: "۱ دقیقه پیش" },
    { id: 3243, multiplier: 4.86, time: "۲ دقیقه پیش" },
    { id: 3242, multiplier: 1.45, time: "۳ دقیقه پیش" },
  ]);
  const [message, setMessage] = useState("برای شروع، یک مبلغ مجازی انتخاب کن.");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTime = useRef(0);
  const roundId = useRef(3246);

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  function startRound() {
    if (status === "running" || status === "cashed") return;
    
if (stake < 1 || stake > credit) {
  setMessage("مبلغ مجازی باید بین ۱ و موجودی فعلی باشد.");
  return;
}
setCredit(v => v - stake);

    setActiveStake(stake);
    setMultiplier(1);
    setStatus("running");
    setMessage("دور در حال اجراست؛ هر زمان خواستی می‌توانی اعتبار آزمایشی را برداشت کنی.");
    startTime.current = Date.now();
    const crashAt = 1.15 + Math.random() * 4.85;
    timer.current = setInterval(() => {
      const elapsed = (Date.now() - startTime.current) / 1000;
      const next = Math.exp(elapsed * 0.18);
      if (next >= crashAt) {
        if (timer.current) clearInterval(timer.current);
        setMultiplier(crashAt);
        setStatus("crashed");
        setMessage(`ضریب در ${crashAt.toFixed(2)}x متوقف شد. این فقط یک شبیه‌سازی نمایشی است.`);
        setRounds(prev => [{ id: roundId.current++, multiplier: Number(crashAt.toFixed(2)), time: "اکنون" }, ...prev].slice(0, 8));
      } else {
        setMultiplier(next);
      }
    }, 60);
  }

  function cashOut() {
    if (status !== "running") return;
    if (timer.current) clearInterval(timer.current);
    const win = Math.floor(activeStake * multiplier);
    setCredit(v => v + win);
    setStatus("cashed");
    setMessage(`برداشت آزمایشی ثبت شد: ${win.toLocaleString("fa-IR")} امتیاز مجازی.`);
  }

  function resetRound() {
    if (status === "running") return;
    setStatus("ready");
    setMultiplier(1);
    setActiveStake(0);
    setMessage("آماده دور بعدی هستی. اعتبارها مجازی‌اند و ارزش نقدی ندارند.");
  }

  const running = status === "running";
  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Z-Crash">Z<span>-</span>CRASH</a>
        <nav><a className="selected" href="#game">خانه</a><a href="#history">تاریخچه</a><a href="#about">درباره بازی</a></nav>
        <div className="wallet"><span className="walletLabel">اعتبار مجازی</span><strong>{credit.toLocaleString("fa-IR")} ◈</strong></div>
      </header>

      <section className="hero">
        <div className="heroText">
          <div className="eyebrow"><span className="dot" /> نسخه نمایشی · بدون پول واقعی</div>
          <h1>هیجانِ ضریب، <em>بدون ریسک مالی</em></h1>
          <p>بازی ضریب‌محور Z-CRASH را با امتیازهای مجازی تجربه کن.</p>
        </div>
        <div className="rocket">🚀</div>
      </section>

      <section id="game" className="layout">
        <div className="mainColumn">
          <section className={`gamePanel ${running ? "isRunning" : ""} ${status === "crashed" ? "isCrashed" : ""}`}>
            <div className="gameMeta"><span>دور #{(roundId.current).toLocaleString("fa-IR")}</span><span className="live"><i /> {running ? "در حال اجرا" : "آماده"}</span></div>
            <div className="orbit orbitOne" /><div className="orbit orbitTwo" />
            <div className="multiplier">{multiplier.toFixed(2)}<small>x</small></div>
            <div className="statusText">{running ? "در حال افزایش..." : status === "crashed" ? "پایان دور" : status === "cashed" ? "اعتبار برداشت شد" : "برای شروع آماده‌ای؟"}</div>
            <div className="track"><span style={{ width: `${Math.min(100, Math.max(3, (multiplier - 1) * 19))}%` }} /></div>
          </section>

          <section className="controlPanel">
            <div className="stakeBlock">
              <label htmlFor="stake">مبلغ امتیاز مجازی</label>
              <div className="stakeInput">
                <button onClick={() => setStake(v => Math.max(1, v - 10))} aria-label="کاهش مبلغ">−</button>
                <input id="stake" type="number" min="1" max={credit} value={stake} onChange={e => setStake(Math.max(1, Number(e.target.value) || 1))} disabled={running} />
                <button onClick={() => setStake(v => Math.min(Math.max(credit, 1), v + 10))} aria-label="افزایش مبلغ">+</button>
              </div>
              <div className="quickAmounts">{[10, 50, 100, 250].map(n => <button key={n} onClick={() => setStake(Math.min(n, Math.max(credit, 1)))} disabled={running}>{n.toLocaleString("fa-IR")}</button>)}</div>
            </div>
            


<div className="actionBlock">
  {running ? (
    <button className="primary cashout" onClick={cashOut}>
      برداشت امتیاز · {Math.round(activeStake * multiplier).toLocaleString("fa-IR")} ◈
    </button>
  ) : status === "crashed" || status === "cashed" ? (
    <button className="primary" onClick={resetRound}>
      دور جدید <span>↗</span>
    </button>
  ) : (
    <button className="primary" onClick={startRound} disabled={credit < 1}>
      شروع بازی <span>↗</span>
    </button>
  )}
  <p className="message" aria-live="polite">{message}</p>
</div>

  

    
              <p className="message" aria-live="polite">{message}</p>
            </div>
            <div className="payout"><span>ضریب فعلی</span><strong>{multiplier.toFixed(2)}x</strong><span>اعتبار قابل برداشت</span><strong>{running ? Math.floor(activeStake * multiplier).toLocaleString("fa-IR") : "—"}</strong></div>
          </section>

          <section id="history" className="historyPanel">
            <div className="sectionHead"><h2>آخرین دورها</h2><span>نتایج شبیه‌سازی‌شده</span></div>
            <div className="roundList">{rounds.map(r => <div className={`roundChip ${r.multiplier >= 2 ? "high" : ""}`} key={r.id}><span>#{r.id.toLocaleString("fa-IR")}</span><strong>{r.multiplier.toLocaleString("fa-IR", {minimumFractionDigits: 2, maximumFractionDigits: 2})}x</strong></div>)}</div>
          </section>
        </div>

        <aside className="sideColumn">
          <section className="sideCard">
            <div className="sectionHead"><h2>چطور بازی کنیم؟</h2><span>۳ مرحله</span></div>
            <div className="howItem"><b>۱</b><div><strong>امتیاز انتخاب کن</strong><p>از اعتبار مجازی خود مبلغی انتخاب کن.</p></div></div>
            <div className="howItem"><b>۲</b><div><strong>ضریب را دنبال کن</strong><p>ضریب نمایشی در طول دور افزایش پیدا می‌کند.</p></div></div>
            <div className="howItem"><b>۳</b><div><strong>قبل از پایان برداشت کن</strong><p>اگر برداشت زودتر ثبت شود، امتیاز مجازی محاسبه می‌شود.</p></div></div>
          </section>
          <section id="about" className="sideCard goldCard">
            <div className="crown">♛</div><h2>نسخه آزمایشی Z-CRASH</h2>
            <p>این پروژه فقط برای سرگرمی و نمایش فنی است. اعتبارها ارزش نقدی ندارند و امکان واریز، برداشت پول یا تبدیل امتیاز به رمزارز وجود ندارد.</p>
          </section>
          <section className="sideCard miniStats"><div><span>وضعیت</span><strong>دمو</strong></div><div><span>ارز</span><strong>امتیاز مجازی</strong></div><div><span>پول واقعی</span><strong>غیرفعال</strong></div></section>
        </aside>
      </section>

      <footer><a className="brand smallBrand" href="#">Z<span>-</span>CRASH</a><span>بازی کن، یاد بگیر، مسئولانه سرگرم شو.</span><span>نسخه ۰.۱ · دمو</span></footer>
    </main>
  </>
  );
