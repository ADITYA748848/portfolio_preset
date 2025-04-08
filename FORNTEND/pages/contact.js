import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { FaPhoneVolume, FaTwitter } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";
import { MdEmail } from "react-icons/md";

export default function contact() {

    const [name, setName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [project, setProject] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [messageok, setMessageOk] = useState('');

    async function createProduct(ev) {
        ev.preventDefault();

        setMessageOk('Sending...')

        const date = { name, lname, email, company, phone, country, project, price, description };

        try {
            await axios.post('/api/contacts', data);
            setMessageOk('✅ message sent successfully')
            setName('');
            setLName('');
            setEmail('');
            setCompany('');
            setPhone('');
            setCountry('');
            setProject('');
            setPrice('');
            setDescription('');
        } catch (error) {
            if (error.response) {
                console.error('server error', error.response.data)
            } else if (error.request) {
                console.error('Network error', error.response.data)
            } else {
                console.error('error', error.message)
            }
            setMessageOk('❌ failed to send message')
        }
    }
    const handleProjectChange = (projectName) => {
        if (project.includes(projectName)) {
            setProject(project.filter(project => project !== projectName))
        } else {
            setProject([...project, projectName])
        }
    }
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    return <>
        <Head>
            <title>Contact us</title>
        </Head>
        <div className="contactpage">
            <div className="container">
                <div className="contactformp">
                    <div className="leftcontp">
                        <h2>Get in touch</h2>
                        <h2>Let's talk about your project</h2>
                        <p>Thinking about a new project, a problem to solve, or just want to connect? Let's do it!</p>
                        <p>Use the form on this page or get in touch by other means.</p>
                        <p>We love questions and feedback and we're always happy to help!</p>
                        <div className="leftsociinfo">
                            <ul>
                                <li><FaPhoneVolume /> <span>Phone: <a href="tel:+123456789" target="_blank">+91-123456789</a></span></li>
                                <li><MdEmail /> <span>Email: <a href="mailto:allknowledge34@gmail.com" target="_blank">allknowledge34@gmail.com</a></span></li>
                                <li><GrLinkedin /> <span>Linkedin: <a href="tel:+123456789" target="_blank">Sachin2005</a></span></li>
                                <li><FaTwitter /> <span>Twitter: <a href="tel:+123456789" target="_blank">@Sachin</a></span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="rightcontp">
                        <form onSubmit={createProduct}>
                            <div className="rightconttitle">
                                <h2>Your Contact Information</h2>
                            </div>
                            <div className="rightcontinputs">
                                <input type="text" value={name} onChange={ev => setName(ev.target.value)}
                                    placeholder="First name" required />
                                <input type="text" value={lname} onChange={ev => setLname(ev.target.value)}
                                    placeholder="Last name" />
                                <input type="email" value={email} onChange={ev => setEmail(ev.target.value)}
                                    placeholder="Email address" required />
                                <input type="text" value={company} onChange={ev => setCompany(ev.target.value)}
                                    placeholder="Company name" required />
                                <input type="text" value={phone} onChange={ev => setPhone(ev.target.value)}
                                    placeholder="Phone number" required />
                                <select name="country" value={country} onChange={(e) => setCountry(e.target.value)}
                                    id="country">
                                    <option value="">Select Country</option>
                                    <option value="AF">Afghanistan</option>
                                    <option value="AL">Albania</option>
                                    <option value="DZ">Algeria</option>
                                    <option value="AS">American Samoa</option>
                                    <option value="AD">Andorra</option>
                                    <option value="AO">Angola</option>
                                    <option value="AI">Anguilla</option>
                                    <option value="AQ">Antarctica</option>
                                    <option value="AG">Antigua and Barbuda</option>
                                    <option value="AR">Argentina</option>
                                    <option value="AM">Armenia</option>
                                    <option value="AW">Aruba</option>
                                    <option value="AU">Australia</option>
                                    <option value="AT">Austria</option>
                                    <option value="AZ">Azerbaijan</option>
                                    <option value="BS">Bahamas</option>
                                    <option value="BH">Bahrain</option>
                                    <option value="BD">Bangladesh</option>
                                    <option value="BB">Barbados</option>
                                    <option value="BY">Belarus</option>
                                    <option value="BE">Belgium</option>
                                    <option value="BZ">Belize</option>
                                    <option value="BJ">Benin</option>
                                    <option value="BM">Bermuda</option>
                                    <option value="BT">Bhutan</option>
                                    <option value="BO">Bolivia</option>
                                    <option value="BA">Bosnia and Herzegovina</option>
                                    <option value="BW">Botswana</option>
                                    <option value="BR">Brazil</option>
                                    <option value="BN">Brunei</option>
                                    <option value="BG">Bulgaria</option>
                                    <option value="BF">Burkina Faso</option>
                                    <option value="BI">Burundi</option>
                                    <option value="KH">Cambodia</option>
                                    <option value="CM">Cameroon</option>
                                    <option value="CA">Canada</option>
                                    <option value="CV">Cape Verde</option>
                                    <option value="CF">Central African Republic</option>
                                    <option value="TD">Chad</option>
                                    <option value="CL">Chile</option>
                                    <option value="CN">China</option>
                                    <option value="CO">Colombia</option>
                                    <option value="KM">Comoros</option>
                                    <option value="CG">Congo</option>
                                    <option value="CR">Costa Rica</option>
                                    <option value="HR">Croatia</option>
                                    <option value="CU">Cuba</option>
                                    <option value="CY">Cyprus</option>
                                    <option value="CZ">Czech Republic</option>
                                    <option value="DK">Denmark</option>
                                    <option value="DJ">Djibouti</option>
                                    <option value="DM">Dominica</option>
                                    <option value="DO">Dominican Republic</option>
                                    <option value="EC">Ecuador</option>
                                    <option value="EG">Egypt</option>
                                    <option value="SV">El Salvador</option>
                                    <option value="GQ">Equatorial Guinea</option>
                                    <option value="ER">Eritrea</option>
                                    <option value="EE">Estonia</option>
                                    <option value="ET">Ethiopia</option>
                                    <option value="FJ">Fiji</option>
                                    <option value="FI">Finland</option>
                                    <option value="FR">France</option>
                                    <option value="GA">Gabon</option>
                                    <option value="GM">Gambia</option>
                                    <option value="GE">Georgia</option>
                                    <option value="DE">Germany</option>
                                    <option value="GH">Ghana</option>
                                    <option value="GR">Greece</option>
                                    <option value="GT">Guatemala</option>
                                    <option value="GN">Guinea</option>
                                    <option value="GY">Guyana</option>
                                    <option value="HT">Haiti</option>
                                    <option value="HN">Honduras</option>
                                    <option value="HU">Hungary</option>
                                    <option value="IS">Iceland</option>
                                    <option value="IN">India</option>
                                    <option value="ID">Indonesia</option>
                                    <option value="IR">Iran</option>
                                    <option value="IQ">Iraq</option>
                                    <option value="IE">Ireland</option>
                                    <option value="IL">Israel</option>
                                    <option value="IT">Italy</option>
                                    <option value="JM">Jamaica</option>
                                    <option value="JP">Japan</option>
                                    <option value="JO">Jordan</option>
                                    <option value="KZ">Kazakhstan</option>
                                    <option value="KE">Kenya</option>
                                    <option value="KI">Kiribati</option>
                                    <option value="KR">Korea</option>
                                    <option value="KW">Kuwait</option>
                                    <option value="KG">Kyrgyzstan</option>
                                    <option value="LA">Laos</option>
                                    <option value="LV">Latvia</option>
                                    <option value="LB">Lebanon</option>
                                    <option value="LS">Lesotho</option>
                                    <option value="LR">Liberia</option>
                                    <option value="LY">Libya</option>
                                    <option value="LI">Liechtenstein</option>
                                    <option value="LT">Lithuania</option>
                                    <option value="LU">Luxembourg</option>
                                    <option value="MG">Madagascar</option>
                                    <option value="MW">Malawi</option>
                                    <option value="MY">Malaysia</option>
                                    <option value="MV">Maldives</option>
                                    <option value="ML">Mali</option>
                                    <option value="MT">Malta</option>
                                    <option value="MH">Marshall Islands</option>
                                    <option value="MR">Mauritania</option>
                                    <option value="MU">Mauritius</option>
                                    <option value="MX">Mexico</option>
                                    <option value="MD">Moldova</option>
                                    <option value="MC">Monaco</option>
                                    <option value="MN">Mongolia</option>
                                    <option value="ME">Montenegro</option>
                                    <option value="MA">Morocco</option>
                                    <option value="MZ">Mozambique</option>
                                    <option value="MM">Myanmar</option>
                                    <option value="NA">Namibia</option>
                                    <option value="NP">Nepal</option>
                                    <option value="NL">Netherlands</option>
                                    <option value="NZ">New Zealand</option>
                                    <option value="NI">Nicaragua</option>
                                    <option value="NE">Niger</option>
                                    <option value="NG">Nigeria</option>
                                    <option value="NO">Norway</option>
                                    <option value="OM">Oman</option>
                                    <option value="PK">Pakistan</option>
                                    <option value="PA">Panama</option>
                                    <option value="PG">Papua New Guinea</option>
                                    <option value="PY">Paraguay</option>
                                    <option value="PE">Peru</option>
                                    <option value="PH">Philippines</option>
                                    <option value="PL">Poland</option>
                                    <option value="PT">Portugal</option>
                                    <option value="QA">Qatar</option>
                                    <option value="RO">Romania</option>
                                    <option value="RU">Russia</option>
                                    <option value="RW">Rwanda</option>
                                    <option value="KN">Saint Kitts and Nevis</option>
                                    <option value="LC">Saint Lucia</option>
                                    <option value="VC">Saint Vincent</option>
                                    <option value="WS">Samoa</option>
                                    <option value="SM">San Marino</option>
                                    <option value="ST">Sao Tome and Principe</option>
                                    <option value="SA">Saudi Arabia</option>
                                    <option value="SN">Senegal</option>
                                    <option value="RS">Serbia</option>
                                    <option value="SC">Seychelles</option>
                                    <option value="SL">Sierra Leone</option>
                                    <option value="SG">Singapore</option>
                                    <option value="SK">Slovakia</option>
                                    <option value="SI">Slovenia</option>
                                    <option value="SB">Solomon Islands</option>
                                    <option value="SO">Somalia</option>
                                    <option value="ZA">South Africa</option>
                                    <option value="ES">Spain</option>
                                    <option value="LK">Sri Lanka</option>
                                    <option value="SD">Sudan</option>
                                    <option value="SR">Suriname</option>
                                    <option value="SZ">Swaziland</option>
                                    <option value="SE">Sweden</option>
                                    <option value="CH">Switzerland</option>
                                    <option value="SY">Syria</option>
                                    <option value="TW">Taiwan</option>
                                    <option value="TJ">Tajikistan</option>
                                    <option value="TZ">Tanzania</option>
                                    <option value="TH">Thailand</option>
                                    <option value="TG">Togo</option>
                                    <option value="TO">Tonga</option>
                                    <option value="TT">Trinidad and Tobago</option>
                                    <option value="TN">Tunisia</option>
                                    <option value="TR">Turkey</option>
                                    <option value="TM">Turkmenistan</option>
                                    <option value="UG">Uganda</option>
                                    <option value="UA">Ukraine</option>
                                    <option value="AE">United Arab Emirates</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="US">United States</option>
                                    <option value="UY">Uruguay</option>
                                    <option value="UZ">Uzbekistan</option>
                                    <option value="VU">Vanuatu</option>
                                    <option value="VE">Venezuela</option>
                                    <option value="VN">Vietnam</option>
                                    <option value="YE">Yemen</option>
                                    <option value="ZM">Zambia</option>
                                    <option value="ZW">Zimbabwe</option>
                                </select>
                            </div>
                            <div className="rightconttitle">
                                <h2>What services do you need for your project?</h2>
                            </div>
                            <div className="rightcontcheckbox">
                                {[
                                    'Website Development',
                                    'App Development',
                                    'Design system',
                                    'Website Migration',
                                    'Design',
                                    'Video Editing',
                                    'Photo Editing'
                                ].map((projectOption) => (
                                    <label key={projectOption} className="cyberpunk-check-label">
                                        <input type="checkbox"
                                            className="cyberpunk-checkbox"
                                            value={projectOption}
                                            checked={project.includes(projectOption)}
                                            onChange={() => handleProjectChange(projectOption)} />
                                        {projectOption}
                                    </label>
                                ))}
                            </div>
                            <div className="rightconttitle">
                                <h2>How much is the anticipated budget for your next project?</h2>
                            </div>
                            <div className="rightcontredio">
                                {['Less than ₹5000', '₹5000-₹10000', '₹10000-₹20000', '₹20000-₹30000', '₹30000-₹40000', 'More than ₹50000'].map(
                                    (priceRange) => (
                                        <div key={priceRange} className="radio-button">
                                            <input
                                                type="radio"
                                                id={priceRange}
                                                name="example-radio"
                                                value={priceRange}
                                                checked={price === priceRange}
                                                onChange={handlePriceChange}
                                            />
                                            <span className="radio"></span>
                                            <label htmlFor={priceRange}>{priceRange}</label>
                                        </div>
                                    ))}
                            </div>
                            <div className="rightconttitle">
                                <h2>Tell me about your project</h2>
                            </div>
                            <div className="rightcontpera">
                                <textarea value={description} onChange={ev => setDescription(ev.target.value)}
                                    name="description" rows={4} id="" placeholder="Project description"></textarea>
                            </div>
                            <hr />
                            <div className="righhcontsbtn flex gap-3">
                                <button type="submit">Submit</button>
                                <p>{messageok}</p>
                            </div>    
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}