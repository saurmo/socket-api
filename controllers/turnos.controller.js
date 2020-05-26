class Turnos {
  constructor() {
    this.ultimo = 0;
    this.turnos = [];
    this.turnosEnAtencion = [];
  }

  generarTurno() {
    this.ultimo += 1;
    let turno = { numero: this.ultimo, caja: null, estado: "Sin atender" };
    this.turnos.push(turno);
    return { ok: true, mensaje: `Turno generado: ${this.ultimo}`, info: turno };
  }

  atenderTurno(caja) {
    if (this.turnos.length === 0) {
      return { ok: false, mensaje: "No hay turno" };
    }

    let turno = this.turnos[0];
    turno.caja = caja;
    turno.estado = "Atendiendo en la caja " + caja;

    let turnoActual = this.turnos.shift();
    this.turnosEnAtencion.push(turnoActual);

    return {
      ok: true,
      mensaje: turno.estado,
      info: { turnos: this.turnos, actual: this.turnosEnAtencion },
    };
  }

  getTurnos() {
    return this.turnos;
  }

  getTurnosEnAtencion() {
    return this.turnosEnAtencion;
  }
}

module.exports = Turnos;
