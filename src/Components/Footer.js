import React , {useEffect} from 'react';
import FooterCss from "./FooterCss.css"
import carLogo from '..//images/transport.png'
import { FaInstagram,FaFacebookSquare,FaWhatsapp,FaSearchLocation,FaPhone,FaMailBulk  ,FaFacebookF } from 'react-icons/fa';



function Footer() {
    return (

    


<footer className="footer-section">
        <div className="container">
            <div className="footer-cta pt-5 pb-5">
                                
  <div className="media">

 

                  <table>
<tr>
                    <td>
                    <div className="cols">
                     
                                <div  ><h2> Find us   <a href='https://maps.app.goo.gl/KAL2xGVdbM7jxSPaA'  style={{ color:'#af9a7d' }} > <FaSearchLocation/></a></h2> </div>
                                <span>  Saida , Beirut-Saida hwy </span> <br/> <span> (eastern highway ), beside mtc </span>

                    </div>
   </td>
   <td>

                    <div className="cols">
                     
                                <h2>Call us   <FaPhone/> </h2>
                                <a href='tel:0096103773813'  style={{textDecoration: 'none' , color:'#af9a7d'}}> <p>03 773 813</p></a>
                                <a href='tel:0096181886686'   style={{textDecoration: 'none' , color:'#af9a7d'}}>  <p>81 886 686</p></a>
                                <a href='tel:0096170610013'  style={{textDecoration: 'none' , color:'#af9a7d'}}> <p>70 610 013</p></a>
                    </div>
    </td>
 


</tr>
                     </table>
                </div>



               
            </div>
            
                            
                           
                            <div className="footer-social-icon"><br />

                              
<span  
style={ {
    alignItems:'center' ,justifyContent:"center" , display:"flex"
    } }
    >
        Media
        
        </span>  
        <br />

<div className='media3' >   


                           <table>
                            <tr>
                       <th>    <a href="">   <h1 style={{color:'#af9a7d'}}>  <FaFacebookF/> </h1>   </a> </th>
                       <th>   <a href="https://instagram.com/abdallahautomotive?igshid=MzRlODBiNWFlZA==">   <h1 style={{color:'#af9a7d'}}>   <FaInstagram/> </h1>   </a></th>
                       <th>     <a href="https://wa.me/81886686"><h1 style={{color:'#af9a7d'}}>  <FaWhatsapp/>  </h1>  </a>  </th>
   
                               </tr>
                               </table>
                           
                           

                             </div>
                             </div>
                             
                            </div>








        <div className="copyright-area">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                        <div className="copyright-text">
                            <p>Copyright &copy; 2023, All Right Reserved <a href="https://www.linkedin.com/in/mohammad-hamdan-42b40a218">M.H.</a></p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </footer>






    );
    }; export default Footer