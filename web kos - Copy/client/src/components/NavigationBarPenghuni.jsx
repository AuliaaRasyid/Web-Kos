import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import logo from "../assets/logo.png"
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Logout from '../utils/Logout';

const NavigationBarPenghuni = () => {
    const { id } = useParams();
    const [usersData, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${id}`); // Use the correct URL
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, );

    return (
        <div>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-[#9EB384] py-4 px-1 text-[30px] text-black md:px-20 md:text-[44px]">
                    <Container fluid>
                        <a href="#">
                            <div className="flex flex-row items-center">
                                <img src={logo} className="w-[50px] md:w-[100px]" alt="HoloHero Logo" />
                                <p>HoloHero</p>
                            </div>
                        </a>
                        <Navbar.Toggle className='text-[30px] border-none' aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            className="bg-[#9EB384] max-w-[60%] md:max-w-[100%]"
                        >
                            <Offcanvas.Header closeButton className=' text-[30px]'>
                            </Offcanvas.Header>
                            <Offcanvas.Body className='font-forum '>
                                <Nav className="justify-content-end flex-grow-1 pe-2 px-8 text-[28px] md:text-[32px]">
                                    <h1 className=' font-bold'>Account</h1>
                                    <Logout />
                                    <h1 className=' font-bold pt-10 pb-2'>Pages</h1>
                                    <Link to={`/PenghuniDashboard/${usersData._id}`}>Dashboard</Link>
                                    <Link to ={`/PenghuniProfile/${usersData._id}`}>Profile</Link>
    
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
    )
}

export default NavigationBarPenghuni