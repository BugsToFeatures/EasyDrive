import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    return(
    <div className="jumbotron">
    <div className="container">
        <div className="row">
            <div className="col-md-6">
            <img src="/img/EasyDrive-removebg-preview.png" width="400px" height="200px" className="img-fluid mb-3" alt="EasyDrive Logo" />
            </div>
            <div className="col-md-6 custom-column">
                <h1>Welcome to EasyDrive!</h1>
                <p>At EasyDrive, we redefine your car-buying experience. Immerse yourself in a digital showroom where the latest models await your exploration. Our app simplifies your journey from choosing to cruising. With EasyDrive, discover a wide range of vehicles, compare features that matter to you, and stay updated with the latest auto trends. Seamless, transparent, and personalized - car shopping is now at your fingertips. Join us and steer into the future of car dealership!</p>
                <button className="btn btn-outline-light" onClick={() => {navigate('/login');}}>See Cars</button>
            </div>
        </div>
    </div>
    <div className="container-fluid">
        <div className="gallery">
            <img src="/img/p2.jpg" class="img-fluid" alt="Image 1" />
        
            <img src="/img/p3.jpg" class="img-fluid" alt="Image 2" />
    
            <img src="/img/p6.jpg" class="img-fluid" alt="Image 3" />
        </div>
    </div>
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 custom-column-2'>
                Presented By the team of <h1>Bugs To Features</h1> <p>THE BugsTOFeatures IS A CREATIVE DIGITAL AGENCY. WE HELP BRANDS TO ESTABLISH THEIR DIGITAL SIGNIFICANCE AND GET AN UPPER HAND ON THEIR COMPETITORS.
</p>
            </div>
            <div className='col-md-6'>
                <img src="/img/team-logo-cropped.jpg" width="500px" height="500px" class="img-fluid" alt="team logo" />
            </div>
        </div>
    </div>

</div>
    );
}

export default Home;