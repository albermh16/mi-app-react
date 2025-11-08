export default function clienteSlice(set,get,store){
    return {
        cliente: JSON.parse( localStorage.getItem('cliente') ) || null,
        accessToken: JSON.parse( localStorage.getItem('accessToken') ) || null,
        setCliente: (nuevoDatoCliente)=>{
            //actualizar la propiedad "cliente" del state global, y en el localStorage q usamos de backup por si hay recarga de pagina
            set ( state => ({ ...state, cliente: { ...state.cliente, ...nuevoDatoCliente} }) );
            localStorage.setItem('cliente', JSON.stringify( { ...get().cliente, ...nuevoDatoCliente} ) );
        },
        setAccessToken: (newAccessToken)=> { 
            set(state => ({ ...state, accessToken: newAccessToken }) ); 
            localStorage.setItem('accessToken', JSON.stringify(newAccessToken)); 
        },
 }
} 