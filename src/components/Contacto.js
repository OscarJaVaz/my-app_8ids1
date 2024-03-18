import React from 'react';
import './contacto.css';

export default function Contacto() {
  return (
    <div className="custom-container">
      <div className="custom-innerwrap">
        <section className="custom-section1 clearfix">
            <br></br>
          <div className="custom-textcenter">
        
            
            <h1>Contactan&oacute;s</h1>
            <span className="custom-seperator" />
          </div>
        </section>
        <section className="custom-section2 clearfix">
          <div className="custom-col2 custom-column1 first">
            <div className="custom-sec2map">
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d938.6458747749577!2d-98.98134184786242!3d19.772842679483304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1925856b13f65%3A0x11d2819fb50a635c!2sConsultorio%20M%C3%A9dico!5e0!3m2!1ses!2smx!4v1710745463753!5m2!1ses!2smx"
                width="100%"
                height="450"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
            <div>
              <small>
                <a href="http://freedirectorysubmissionsites.com/">Direcci&oacute;n del consultorio.</a>
              </small>
            </div>
          </div>
          <div className="custom-col2 custom-column2 last">
            <div className="custom-sec2innercont">
              <div className="custom-sec2addr">
                <p>De Los Colegios 1, Reyes Acozac, 55755 Los Reyes Acozac, Méx.</p>
                <p>
                  <span className="custom-collig">Numero de telefono :</span> +52 5619019251
                </p>
                <p>
                  <span className="custom-collig">Correo electronico :</span> consultech@gmail.com
                </p>
                
              </div>
            </div>
            <div className="custom-sec2contactform">
              <h3 className="custom-sec2frmtitle">¿Tienes dudas? Dejan&oacute;s tu correo y nos contactaremos contigo</h3>
              <form className='contactus' action="">
                <div className="clearfix">
                  <input className="custom-col2 first" type="text" placeholder="Nombre" />
                  <input className="custom-col2 last" type="text" placeholder="Apeliido" />
                </div>
                <div className="clearfix">
                  <input className="custom-col2 first" type="email" placeholder="Correo electronico" />
                  <input className="custom-col2 last" type="text" placeholder="Numero de contacto" />
                </div>
                <div className="clearfix">
                  <textarea
                    name="textarea"
                    id=""
                    cols={30}
                    rows={7}
                    defaultValue={"Escribe tu mensaje aqui..."}
                  />
                </div>
                <div className="clearfix">
                  <input type="submit" defaultValue="Send" />
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
