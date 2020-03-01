import React from "react";

const Imagen = ({ imagen }) => {
    //extraigo las variables con destructuring
    const { largeImageURL, likes, previewURL, tags, views } = imagen;

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
                <img src={previewURL} alt={tags} className="card-img-top" />

                <div className="card-body">
                    <div className="card-text">{likes} Me gusta</div>
                    <div className="card-text">{views} Vistas</div>
                </div>

                <div className="card-footer">
                    <a
                        href={largeImageURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-block"
                    >
                        Ver Imagen
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Imagen;
