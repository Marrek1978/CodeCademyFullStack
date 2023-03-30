import React from "react";

function Home() {
  //hero
  //shop all
  return (
    <>
      <section id="hero" className="relative">
        <img src="/hero.png" className="w-full " />
        <div id="hero-text" className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">
          <div className="text-yellow-900 text-6xl font-bold "> Ski Sale</div>
          <h2 className="text-red text-2xl font-bold tracking-widest"> Always on Sale</h2>
          <button className="bg-orange-600 text-white mt-5 d">SHOP ALL</button>
        </div>
      </section>
      <main >
        <section id="all-products" className='drop-shadow-2xl'>All Sale Products</section>

 
      </main>
    </>
  );
}

export default Home;
