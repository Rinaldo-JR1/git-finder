import { Header } from "../../components/Header/index";
import background from "../../assets/background.png";
import { ItemList } from "../../components/ItemList";
import { useState } from "react";
import "./styles.css";
function App() {
  const [user, setUser] = useState("");
  const [curruentUser, setCurruentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    console.dir(newUser);
    if (newUser.name) {
      const { login, avatar_url, name, bio } = newUser;
      setCurruentUser({ login, avatar_url, name, bio });
      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`
      );
      const newRepos = await reposData.json();
      console.dir(newRepos);
      if (newRepos.length >= 1) {
        setRepos(newRepos);
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="content ">
        <img src={background} alt="background" className="background" />
        <div className="info">
          <div>
            <input
              name="usuario"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
              placeholder="@UserName"
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {curruentUser?.name ? (
            <>
              <div className="perfil">
                <img
                  src={curruentUser.avatar_url}
                  alt="avatar"
                  className="profile"
                />
                <div>
                  <h3>{curruentUser.name}</h3>
                  <span>{curruentUser.login}</span>
                  <p>{curruentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null}

          {repos?.length >= 1 ? (
            <div>
              {repos.map((repo) => (
                <ItemList title={repo.name} description={repo.description} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
