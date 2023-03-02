import "./About.css";


function About(): JSX.Element {
    return (
        <div className="About">
            <p>
            Coupon System is a web-based application that provides a comprehensive coupon management system for various client types, including admin, customer, and company. The system is designed to offer an easy-to-use interface and powerful tools for managing coupons, discounts, and promotional offers. The backend of the system is built on the Spring Framework, while the frontend is based on React, and the database is powered by MySql.
            </p>
            <p>
            The Coupon System is designed to cater to different types of clients:
            </p>
            <li>ADMIN -  As an admin, you have complete control over the entire system. You can manage the customer and company accounts, add/delete/update new customers and companies.</li>

            <li>
            COMPANY - As a Company, you can create and manage their coupons on the system. 
            </li>
            <li>
            CUSTOMER - As a customer, you can browse through the various coupons available on the platform and buy them.
            </li>
            <p>
            The system is designed to be highly secure and user-friendly. The application uses industry-standard security protocols to ensure the safety of the data, and the user interface is intuitive and easy to use.
            </p>

            
        </div>
    );
}

export default About;
