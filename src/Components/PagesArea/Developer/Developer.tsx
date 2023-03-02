import "./Developer.css";
import myImg from "../../../Assets/Images/MyFoto.jpeg";

function Developer(): JSX.Element {
    return (
        <div className="Developer">
            <div>
            <h1>✦Natali Donov✦</h1>
            <h3>About me</h3>
            <p>I am a Java Full Stack developer who recently completed a comprehensive training program at John Bryce College. With a passion for building complex and dynamic web applications, I am excited to apply my skills and knowledge to help companies create cutting-edge software solutions.  </p>
            <h3>Education</h3>
            <p>John Bryce College, Tel Aviv - Java Full Stack Development</p>
            <p>My Technical Skills:</p>
            <li>Java</li>
            <li>Spring Framework</li>
            <li>SQL(MySql)</li>
            <li>React</li>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>CSS</li>
            <li>HTML</li>
            <li>Docker</li>
            <li>Git</li>
            <li>NoSQL(MongoDB)</li>
            <li>Redis</li>
            </div>
            <div>
            <img src={myImg} alt="myPhoto" />

            </div>
            

            
        </div>
    );
}

export default Developer;
