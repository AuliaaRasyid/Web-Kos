import logo from "../assets/logo.png"
import kosan1 from "../assets/kosan3.jpg"
import kosan2 from "../assets/kosan4.jpg"
import kosan3 from "../assets/kosan5.jpg"
import cash from "../assets/icon/bi_cash.png"
import ac from "../assets/icon/ac.png"
import wifi from "../assets/icon/wifi.png"
import chair from "../assets/icon/kursi.png"
import kulkas from "../assets/icon/kulkas.png"
import kitchen from "../assets/icon/kitchen.png"
import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { } from "./styles/Home.css"

const Home = ( ) => {
    return (
        <div className="font-forum">
            <header>
                <nav className="flex bg-[#9EB384] flex-row items-center 
                justify-between text-black py-4 px-2 md:px-10 text-[30px] md:text-[44px]">
                    <a href="/">
                        <div className="flex flex-row items-center">
                            <img src={logo} className="w-[50px] md:w-[100px]" />
                            <p>HoloHero</p>
                        </div>
                    </a>
                    <a href="/loginPage"><p>LOG IN</p></a>
                </nav>
            </header>
            <main>
                <div className="hero">
                    <div className="hero__inner">
                        <h1 className="hero__title">HoloHero</h1>
                        <p className="hero__tagline">
                            Tempat Tinggal dengan Kenyamanan Maksimal
                        </p>
                    </div>
                </div>
                <div className="mainContent bg-[#FAF1E4]">
                    <section className="kosan__main">
                        <Container className="carousel-container">
                            <Carousel fade controls={false} indicators={false} interval={5000}>
                                <Carousel.Item>
                                    <Image src={kosan1} className="d-block w-100 img-fluid" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <Image src={kosan2} className="d-block w-100 img-fluid" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <Image src={kosan3} className="d-block w-100 img-fluid" />
                                </Carousel.Item>
                            </Carousel>
                        </Container>
                        <div className="flex flex-col items-center text-center text-[30px] md:text-[44px] mt-4">
                            <p className="font-bold">Kosan HoloHero</p>
                            <p>Jl. Siaga II No 32 E, Jakarta Selatan</p>
                            <p>Kamar: {}</p>
                        </div>
                    </section>
                    <section className="facility">
                        <div className="kosan__facility text-[44px] flex flex-col items-center p-20">
                            <h1 className="px-4 py-1 border-b-8 border-[#435334] w-fit font-bold">Facility</h1>
                            <p className="text-[32px] text-center">Kosan dilengkapi dengan fasilitas berikut</p>
                            <div className="icon__container">
                                <div className="icon__item">
                                    <img src={wifi} className="border-b-4 border-[#435334] w-fit" />
                                    <p>Lengkap dengan wifi</p>
                                </div>
                                <div className="icon__item ">
                                    <img src={kitchen} className="border-b-4 border-[#435334] w-fit"/>
                                    <p>Tersedia Dapur</p>
                                </div>
                                <div className="icon__item">
                                    <img src={ac} className="border-b-4 border-[#435334] w-fit"/>
                                    <p>Air Conditinier</p>
                                </div>
                                <div className="icon__item">
                                    <img src={chair} className="border-b-4 border-[#435334] w-fit"/>
                                    <p>Terdapat Outdoor</p>
                                </div>
                                <div className="icon__item">
                                    <img src={cash} className="border-b-4 border-[#435334] w-fit"/>
                                    <p>Pembayaran dengan sistem</p>
                                </div>
                                <div className="icon__item">
                                    <img src={kulkas} className="border-b-4 border-[#435334] w-fit"/>
                                    <p>Tersedia Kulkas</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="benefit">
                        <div className="kosan__benefit text-[44px] flex flex-col items-center pt-3 p-20">
                            <h1 className="px-4 py-1 border-b-8 border-[#435334] w-fit font-bold">Benefit</h1>
                            <p className="text-[32px] text-center pb-16">Keuntungan Ngekos di HoloHero adalah sebagai berikut</p>
                            <Accordion className="benefit__accordion">
                                <Accordion.Item eventKey="0" className="accordion__item">
                                    <Accordion.Header>Benefit 1</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1" className="accordion__item">
                                    <Accordion.Header>Benefit 2</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2" className="accordion__item">
                                    <Accordion.Header>Benefit 3</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </section>
                    <section className="contact">
                        <div className="kosan__contact text-[44px] flex flex-col items-center pt-3 p-20">
                            <h1 className="px-4 py-1 border-b-8 border-[#435334] w-fit font-bold">Contact</h1>
                            <p className="pb-10 text-[32px] text-center">Kontak untuk pertanyaan lebih lanjut silakan hubungi</p>
                            <div className="contact__container">
                                <p className="contact__title text-[28px] md:text-[44px] font-bold">Rusdi Awamalum</p>
                                <p className="contact__subtitle text-[28px] md:text-[40px]">owner</p>
                                <div className="contact__button">
                                    <button className="phone-button">087731366528</button>
                                    <button className="whatsapp-button"><i className="fa fa-whatsapp" aria-hidden="true"></i>  WhatsApp</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <footer className=" bg-[#9EB384] p-8">
                <p className=" text-center text-[32px]">footer by group lmao 32</p>
            </footer>
        </div>
    );
};



export default Home
