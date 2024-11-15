const First = () => {
  const handleYes = () => {
    alert("Нажми Нє");
  };

  const handleNo = () => {
    window.electron.sendAction("no");
  };

  return (
    <div style={{ flex: '1', display: "flex", alignItems: `center`, justifyContent: `center`, width: `100%` }}>
      <div style={{ textAlign: "center" }}>
        <h1>Ідеш в доту?</h1>
        <button onClick={handleYes} style={{ margin: "10px", padding: "10px 20px" }}>
          Да
        </button>
        <button onClick={handleNo} style={{ margin: "10px", padding: "10px 20px" }}>
          Нє
        </button>
      </div>
    </div>
  );
};

export default First;
