import { Testimonial } from "../models/Testimoniales.js";
const guardarTestimonial = async (req,res) =>{
    // validar valores

    const {nombre,correo,mensaje} = req.body;

    const errores = []

    if(nombre.trim()===""){
        errores.push({mensaje:"el Nombre esta vacio"})
    }

    if(correo.trim()===""){
        errores.push({mensaje:"el Correo esta vacio"})
    }

    if(mensaje.trim()===""){
        errores.push({mensaje:"el Mensaje esta vacio"})
    }
    
    if (errores.length > 0){

        //Consultar testimonales existente
        const testimoniales = await Testimonial.findAll();
        //Mostrar vista con errores

        res.render("testimoniales", {
            pagina : "Testimoniales",
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }else{
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect("testimoniales")
        } catch (error) {
            console.log(error)
        }
    }

    console.log(req.body)
}

export {
    guardarTestimonial

}