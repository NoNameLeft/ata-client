import './Home.css';

const Home = (props) => {
    return (
        <div className="home">
            <h1>Welcome to <span>HOME</span> page</h1>
            <h3>Hello, <span>{props.uname}</span>!</h3>
        </div>
    );
};

export default Home;