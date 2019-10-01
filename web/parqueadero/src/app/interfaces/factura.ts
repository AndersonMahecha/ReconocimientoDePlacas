export interface factura{
    idFactura:number,
    idCliente:string,
    idmovimiento:string,
    horaSalida: Date,
    cobro: Float32Array,
    placa:string
}