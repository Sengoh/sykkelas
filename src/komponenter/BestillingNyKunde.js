import React from 'react';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from '../services/mysql_connection'
import { ansatteService, bestillingService } from '../services/services';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

// Regstrerer kunde
export class Kunde extends Component {

  state = {
    fn: "",
    en: "",
    epost: "",
    tlf: "",
    bid: null,
    addresse: "",
    poststed: "",
    postnr: "",
    vis: "container d-block",
    err: "alert alert-danger d-none"

  }

  endre = event => {
    this.setState({ [event.target.name]: event.target.value })
    this.props.onChange(event.target.name, event.target.value)
  }


  render() {

    return(
      <div className={this.state.vis}>
        <div className="pt-4 pb-3">
          <h4>1. Registrer kunde</h4>
        </div>
        <div className={this.state.err}>
          Sjekk at alle feltene er utfylt!
        </div>

        <form className="pt-2">
          <div className="form-row">
             <div className="col mb-3">
               <label htmlFor="exampleInputFn">Fornavn</label>
               <input type="text" className="form-control" name="fn" id="exampleInputFn" aria-describedby="emailHelp" value={this.state.fn} onChange={this.endre}/>
             </div>
             <div className="col mb-3">
               <label htmlFor="exampleInputEn">Etternavn</label>
               <input type="text" className="form-control" name="en" id="exampleInputEn" aria-describedby="emailHelp" value={this.state.en} onChange={this.endre} />
             </div>
           </div>

          <div className="form-row">
             <div className="col mb-3">
               <label htmlFor="exampleInputEmail1">Adresse</label>
               <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.addresse} onChange={event => this.setState({ addresse: event.target.value})}/>
             </div>
             <div className="col mb-3">
               <label htmlFor="exampleInputPass">Poststed</label>
               <input type="text" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.state.poststed} onChange={event => this.setState({ poststed: event.target.value})} />
             </div>
             <div className="col mb-3">
               <label htmlFor="exampleInputPass">Postnummer</label>
               <input type="number" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.state.postnr} onChange={event => this.setState({ postnr: event.target.value})} />
             </div>
           </div>

          <div className="form-row">
             <div className="col mb-3">
               <label htmlFor="exampleInputEmail1">E-post</label>
               <input type="email" name="epost" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.epost} onChange={this.endre}/>
             </div>
             <div className="col mb-3">
               <label htmlFor="exampleInputPass">Telefon</label>
               <input type="number" name="tlf" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.state.tlf} onChange={this.endre} />
             </div>
           </div>



           <button type="button" onClick={this.add} className="btn btn-primary float-right mb-5">Registrer kunde</button>

         </form>

        </div>

    );
  }


  add(){
    if (this.state.fn != "" && this.state.en != "" && this.state.epost != "" && this.state.tlf != null && this.state.postnr != null && this.state.addresse != "" && this.state.poststed != "") {
      bestillingService.addKunder(this.state.fn, this.state.en, this.state.epost, this.state.addresse, this.state.postnr, this.state.poststed, this.state.tlf, () => {
      });
      this.setState({ vis: "container d-none"})
    } else {
      this.setState({err: "alert alert-danger d-block"})
    }

  }



}

// Registerer bestilling
export class Bestilling extends Component {
  //Variabler for dato
  fraDato = "2000-01-01";
  tilDato = "2000-01-01";
  dd= null;
  mm= null;
  yyyy = null;

  //Variabler for tid
  henteTid = null;
  levereTid = null;
  tid = null;
  m = null;
  t = null;

  state = {
    bid: null,
    start: "",
    slutt: "",
    hente: "",
    levere: "",
    hentested: null,
    leveringssted: null,
    gruppe: 1,
    vis: "container d-block",
    err: "alert alert-danger d-none"
  }


  render() {
    return(
      <div className={this.state.vis}>
        <div className="pt-5 pb-2">
          <h4>2. Registrer bestilling</h4>
        </div>
        <div className={this.state.err}>
          Sjekk at alle feltene er utfylt!
        </div>

        <form>
          <div className="form-row pt-2">
             <div className="col-4 mb-3">
               <label htmlFor="exampleInputEmail1">Fra</label>
               <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.start} onBlur={this.endreDato} onChange={event => this.setState({ start: event.target.value})}/>
             </div>
             <div className="col-4 mb-3">
               <label htmlFor="exampleInputEmail1">Hentetid</label>
               <input type="time" className="form-control" id="henteTid" step="600" aria-describedby="emailHelp" value={this.state.hente} onBlur={this.endreTid} onChange={event => this.setState({ hente: event.target.value})} />
             </div>
             <div className="col-4 mb-3">
               <label htmlFor="exampleInputEmail1">Hentested</label>
               <select className="custom-select" onChange={event => this.setState({ hentested: event.target.value})}>
                 <option defaultValue>Velg sted</option>
                 <option value="1">Haugastøl</option>
                 <option value="2">Finse</option>
               </select>
             </div>
           </div>

          <div className="form-row">
             <div className="col mb-3">
               <label htmlFor="exampleInputPass">Til</label>
               <input type="date" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.state.slutt} onBlur={this.endreDato} onChange={event => this.setState({ slutt: event.target.value})} />
               <span className="error" id="errorD"></span>
             </div>
             <div className="col mb-3">
               <label htmlFor="exampleInputPass">Leveringstid</label>
               <input type="time" className="form-control" id="levereTid" step="600" aria-describedby="emailHelp" value={this.state.levere} onBlur={this.endreTid} onChange={event => this.setState({ levere: event.target.value})} />
               <span className="error" id="errorT"></span>
             </div>
             <div className="col mb-3">
               <label htmlFor="exampleInputPass">Leveringssted</label>
               <select className="custom-select" onChange={event => this.setState({ leveringssted: event.target.value})}>
                 <option defaultValue>Velg sted</option>
                 <option value="1">Haugastøl</option>
                 <option value="2">Finse</option>
                 <option value="3">Flåm</option>
                 <option value="4">Voss</option>
                 <option value="5">Myrdal</option>
               </select>
             </div>
           </div>

           <div className="form-row pt-5">

              <div className="col-4 mb-3">
              <h5>Gruppebestilling</h5>
                <div className="form-check mb-2">
                 <input className="form-check-input" type="checkbox" id="autoSizingCheck" onChange={() => gruppe.disabled ? gruppe.disabled = false : gruppe.disabled = true} />
                 <label className="form-check-label" htmlFor="autoSizingCheck">
                   Gruppe
                 </label>
               </div>
               <div className="col mb-3">
                 <label htmlFor="gruppe">Antall personer</label>
                 <input type="number" id="gruppe" className="form-control" aria-describedby="emailHelp" value={this.state.gruppe} onChange={event => (this.state.gruppe = event.target.value)} disabled />
               </div>
              </div>



            </div>

            <button type="button" onClick={this.add2} className="btn btn-primary float-right mb-5">Registrer bestilling</button>

          </form>

         </div>

    );



  }
  endreDato() {
    errorD.innerText = "";

    //Sjekker om hentedatoen skjer etter leveringdatoen, og endrer leveringdatoen hvis den er det
    if(this.state.start > this.state.slutt) {
      errorD.innerText = "Hentedato er etter leveringdato. Leveringdato er endret til hentedato";
      this.state.slutt = this.state.start;
    }

    //Sjekker om hentedatoen skjer i fortiden, og endrer den hvis den er det
    if(this.state.start < (this.yyyy + "-0" + this.mm + "-" + this.dd)) {
      errorD.innerText = "Valgt dato er feil. Endret til dagens dato.";
      this.state.start = (this.yyyy + "-0" + this.mm + "-" + this.dd)
    }
  }
  endreTid() {
    errorT.innerText = "";

    //Endrer hentetid minutter
    this.tempM = Math.ceil(henteTid.value.split(":")[1]/10)*10;
    if(this.tempM == 0) {
      this.tempM = "00";
    }
    if(this.tempM >= 60) {
      this.tempM = "00";
    }
    console.log(this.tempM);
    this.state.hente = henteTid.value.split(":")[0] + ":" + this.tempM;

    //Endrer leveringstid minutter
    this.tempM = Math.ceil(levereTid.value.split(":")[1]/10)*10;
    if(this.tempM == 0) {
      this.tempM = "00";
    }
    if(this.tempM >= 60) {
      this.tempM = "00";
    }
    console.log(this.tempM);
    this.state.levere = levereTid.value.split(":")[0] + ":" + this.tempM;

    //Sjekker om hentetiden er etter leverigstiden og endrer leveringstiden hvis den er det
    if(this.state.start == this.state.slutt && this.state.hente > this.state.levere) {
      console.log("wut");
      this.state.levere = this.state.hente;
      errorT.innerText = "Hentetid kan ikke være etter leveringstid. Leveringstid endret.";
    }

    //Sjekker om hentetiden skjer i fortiden, og endrer den hvis den er det
    if(this.state.start == (this.yyyy + "-0" + this.mm + "-" + this.dd) && this.state.hente < this.t + ":" + this.m) {
      console.log("wat");
      this.state.hente = this.t + ":" + this.m;
      errorT.innerText = "Hentetiden er i fortiden. Hentetid endret.";
    }

  }
  // Overføring av brukerid til denne komponenten
  componentDidUpdate() {
    bestillingService.getKundeId(this.props.fn, this.props.en, this.props.epost, this.props.tlf, svar => {
      this.setState({bid: svar})
    });
  }
  mounted() {
    this.fraDato = new Date();
    this.ahh = new Date();
    console.log(this.ahh);
    this.dd = ("0" + this.fraDato.getDate()).slice(-2);
    this.mm = this.fraDato.getMonth()+1;
    this.yyyy = this.fraDato.getFullYear();
    console.log(this.yyyy);
    this.fraDato = this.yyyy + "-0" + this.mm + "-" + this.dd;
    this.state.start = this.fraDato;
    this.state.slutt = this.fraDato;
    console.log(this.fraDato);
    this.tilDato = this.fraDato;

    //Henter tid
    this.henteTid = new Date();
    this.tid = new Date();
    //Finner nærmeste tiende minutt
    this.m = Math.ceil(this.tid.getMinutes()/10)*10;
    this.t = this.tid.getHours()
    if(this.m >= 60) {
      this.m = "00";
      this.t++;
    } else if (this.m >= 0 && this.m < 10) {
      this.m = "10";
    }
    this.henteTid = this.t + ":" + this.m;
    this.state.hente = this.henteTid;
    this.state.levere = this.henteTid;
    this.levereTid = this.henteTid;
  }
  add2 = () => {
    if (this.state.start != "" && this.state.hente != "" && this.state.slutt != "" && this.state.levere != "" && this.state.hentested != null && this.state.leveringssted != null) {
      bestillingService.addLeietakerNyK(this.state.start + " " + this.state.hente + ":00", this.state.slutt + " " + this.state.levere + ":00", this.state.bid.brukerid, this.state.hentested, this.state.leveringssted, this.state.gruppe, () => {
      });
      this.props.onClick(this.state.bid.brukerid)
      this.setState({ vis: "container d-none"})
    } else {
      this.setState({ err: "alert alert-danger d-block"})
    }
  }

}

// Registrer sykler og ekstrautstyr
export class Ekstrautstyr extends Component {

  state = {
    bid: null,
    lid: null,
    antallT: [],
    antallTandem: [],
    antallEl: [],
    terreng: null,
    tandem: null,
    el: null,
    antallHjelm: [],
    antallVogn: [],
    antallSete: [],
    hjelm: null,
    vogn: null,
    sete: null,

    vis: "container d-block"
  }


  render() {

    // Brukes for å sjekke antall sykler og utstyr tilgjengelig
    const number = this.state.antallT.length
    const number1 = this.state.antallTandem.length
    const number2 = this.state.antallEl.length
    const listT = []
    const listTandem = []
    const listEl = []
    for (var i = 0; i < number; i++) {
      listT.push(i+1)
    }
    for (var i = 0; i < number1; i++) {
      listTandem.push(i+1)
    }
    for (var i = 0; i < number2; i++) {
      listEl.push(i+1)
    }


    const num = this.state.antallHjelm.length
    const num1 = this.state.antallSete.length
    const num2 = this.state.antallVogn.length
    const listHjelm = []
    const listSete = []
    const listVogn = []
    for (var i = 0; i < num; i++) {
      listHjelm.push(i+1)
    }
    for (var i = 0; i < num1; i++) {
      listSete.push(i+1)
    }
    for (var i = 0; i < num2; i++) {
      listVogn.push(i+1)
    }





    return(
      <div className={this.state.vis}>
        <div className="pt-5">
          <h4>3. Legg til sykler og ekstrautstyr</h4>
        </div>

        <form>
           <div className="form-row pt-5">


              <div className="col-6 mb-3">
              <h5>Sykkeltype</h5>

                <div className="form-check mb-2">
                 <label className="form-check-label" htmlFor="autoSizingCheck">
                   Terrengsykkel
                 </label>
                 </div>
                 <div className="col mb-3">
                   <select className="custom-select" onChange={event => this.setState({ terreng: event.target.value})}>
                    <option defaultValue>Velg antall</option>
                     {listT.map((antall,index) => (
                       <option key={index} value={antall}>{antall}</option>
                     ))}
                  </select>
               </div>


             <div className="form-check mb-2">
              <label className="form-check-label" htmlFor="autoSizingCheck">
                Tandemsykkel
              </label>
            </div>
            <div className="col mb-3">
              <select className="custom-select" onChange={event => this.setState({ tandem: event.target.value})}>
                <option defaultValue>Velg antall</option>
                {listTandem.map((antall,index) => (
                  <option key={index} value={antall} >{antall}</option>
                ))}
              </select>
            </div>


            <div className="form-check mb-2">
             <label className="form-check-label" htmlFor="autoSizingCheck">
               El-sykkel
             </label>
            </div>
            <div className="col mb-3">
              <select className="custom-select" onChange={event => this.setState({ el: event.target.value})}>
                <option defaultValue>Velg antall</option>
                {listEl.map((antall,index) => (
                  <option key={index} value={antall}>{antall}</option>
                ))}
              </select>
            </div>

            </div>

              <div className="col-6 mb-3">
              <h5>Ekstrautstyr</h5>
              <div className="form-check mb-2">
               <label className="form-check-label" htmlFor="autoSizingCheck">
                 Hjelm
               </label>
               </div>
               <div className="col mb-3">
                 <select className="custom-select" onChange={event => this.setState({ hjelm: event.target.value})}>
                   <option defaultValue>Velg antall</option>
                   {listHjelm.map((antall,index) => (
                     <option key={index} value={antall}>{antall}</option>
                   ))}
                 </select>
               </div>


             <div className="form-check mb-2">
              <label className="form-check-label" htmlFor="autoSizingCheck">
                Barnesete
              </label>
            </div>
            <div className="col mb-3">
              <select className="custom-select" onChange={event => this.setState({ sete: event.target.value})}>
                <option defaultValue>Velg antall</option>
                {listSete.map((antall,index) => (
                  <option key={index} value={antall}>{antall}</option>
                ))}
              </select>
            </div>


            <div className="form-check mb-2">
             <label className="form-check-label" htmlFor="autoSizingCheck">
               Barnevogn
             </label>
            </div>
            <div className="col mb-3">
              <select className="custom-select" onChange={event => this.setState({ vogn: event.target.value})}>
                <option defaultValue>Velg antall</option>
                {listVogn.map((antall,index) => (
                  <option key={index} value={antall}>{antall}</option>
                ))}
              </select>
            </div>

            </div>

            </div>

            <button type="button" onClick={this.add3} className="btn btn-primary float-right mb-5">Legg til</button>

          </form>

         </div>

    );
  }

  componentDidMount(){
    // Hente sykler tilgjengelig
    ansatteService.getSykkel1("terreng", sykler => {
      this.setState({antallT: sykler})
    })
    ansatteService.getSykkel1("tandem", sykler => {
      this.setState({antallTandem: sykler})
    })
    ansatteService.getSykkel1("el", sykler => {
      this.setState({antallEl: sykler})
    })


    // Hente utstyr tilgjengelig
    ansatteService.getUtstyr1("hjelm", utstyr => {
      this.setState({antallHjelm: utstyr})
    })
    ansatteService.getUtstyr1("barnesete", utstyr => {
      this.setState({antallSete: utstyr})
    })
    ansatteService.getUtstyr1("barnevogn", utstyr => {
      this.setState({antallVogn: utstyr})
    })
  }

  // Overføring av leieid til denne komponenten
  componentDidUpdate() {
    bestillingService.getLeieId(this.props.bid, svar => {
      this.setState({lid: svar.leieid})
    });

  }


  add3(){
    // Legge til sykler
    const idArray = []
    const aSykler = Number(this.state.terreng) + Number(this.state.tandem) + Number(this.state.el)
    const type = [this.state.terreng, this.state.tandem, this.state.el]
    const typeA = [this.state.antallT, this.state.antallTandem, this.state.antallEl]

    for (var k = 0; k < type.length; k++) {
      for (var j = 0; j < type[k]; j++) {
        idArray.push(typeA[k][j].id)
      }
    }

    for (var i = 0; i < aSykler; i++) {
      ansatteService.insertSykkel(this.state.lid, idArray[i], sykler => {
        console.log("succ");

      });
    }


    // Legge til ekstrautstyr
    const idArray1 = []
    const aUtstyr = Number(this.state.hjelm) + Number(this.state.sete) + Number(this.state.vogn)
    const type1 = [this.state.hjelm, this.state.sete, this.state.vogn]
    const typeA1 = [this.state.antallHjelm, this.state.antallSete, this.state.antallVogn]

    for (var k = 0; k < type1.length; k++) {
      for (var j = 0; j < type1[k]; j++) {
        idArray1.push(typeA1[k][j].utstyrid)
      }
    }

    for (var i = 0; i < aUtstyr; i++) {
      ansatteService.insertUtstyr(this.state.lid, idArray1[i], utstyr => {
        console.log("succ1");

      });
    }

    alert("Bestilling registrert")
    history.push("/bestilling/" + this.state.lid)

  }

}
