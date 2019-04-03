import React from 'react';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection"
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService, bestillingService } from './services';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


export class Kunde extends Component {

  state = {
    fn: "",
    en: "",
    epost: "",
    tlf: null,
    bid: null,
    addresse: "",
    poststed: "",
    postnr: null,
    vis: "container d-block"
  }

  endre = event => {
    this.setState({ [event.target.name]: event.target.value })
    this.props.onChange(event.target.name, event.target.value)
  }


  render() {

    return(
      <div className={this.state.vis}>
        <div className="pt-4">
          <h4>Bestilling for nye kunder</h4>
        </div>

        <form className="pt-5">
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
    bestillingService.addKunder(this.state.fn, this.state.en, this.state.epost, this.state.addresse, this.state.postnr, this.state.poststed, this.state.tlf, () => {
    });
    this.setState({ vis: "container d-none"})
  }



}

export class Bestilling extends Component {

  state = {
    bid: null,
    start: '2019-03-25',
    slutt: '2019-03-25',
    hente: "00:00",
    levere: "00:00",
    hentested: null,
    leveringssted: null,
    gruppe: null,
    vis: "container d-block"
  }


  render() {
    return(
      <div className={this.state.vis}>
        <div className="pt-4 pb-5">
          <h4>Bestilling for nye kunder</h4>
        </div>

        <form>
          <div className="form-row pt-5">
             <div className="col-4 mb-3">
               <label htmlFor="exampleInputEmail1">Fra</label>
               <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.start} onChange={event => this.setState({ start: event.target.value})}/>
             </div>
             <div className="col-4 mb-3">
               <label htmlFor="exampleInputEmail1">Hentetid</label>
               <input type="time" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.hente} onChange={event => this.setState({ hente: event.target.value})} />
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
               <input type="date" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.state.slutt} onChange={event => this.setState({ slutt: event.target.value})} />
             </div>
             <div className="col mb-3">
               <label htmlFor="exampleInputPass">Leveringstid</label>
               <input type="time" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.state.levere} onChange={event => this.setState({ levere: event.target.value})} />
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

  componentDidUpdate() {
    bestillingService.getKundeId(this.props.fn, this.props.en, this.props.epost, this.props.tlf, svar => {
      this.setState({bid: svar})
    });
  }

  add2 = () => {
    bestillingService.addLeietakerNyK(this.state.start + " " + this.state.hente + ":00", this.state.slutt + " " + this.state.levere + ":00", this.state.bid.brukerid, this.state.hentested, this.state.leveringssted, this.state.gruppe, () => {
    });
    this.props.onClick(this.state.bid.brukerid)
    this.setState({ vis: "container d-none"})

  }

}

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
        <div className="pt-4">
          <h4>Bestilling for nye kunder</h4>
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
                     {listT.map(antall => (
                       <option key={antall.id} value={antall}>{antall}</option>
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
                {listTandem.map(antall => (
                  <option key={antall.id} value={antall} >{antall}</option>
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
                {listEl.map(antall => (
                  <option key={antall.id} value={antall}>{antall}</option>
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
                   {listHjelm.map(antall => (
                     <option key={antall.id} value={antall}>{antall}</option>
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
                {listSete.map(antall => (
                  <option key={antall.id} value={antall}>{antall}</option>
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
                {listVogn.map(antall => (
                  <option key={antall.id} value={antall}>{antall}</option>
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


    // for (var i = 0; i < this.state.terreng; i++) {
    //   idArray.push(this.state.antallT[i].id)
    // }
    // for (var i = 0; i < this.state.tandem; i++) {
    //   idArray.push(this.state.antallTandem[i].id)
    // }
    // for (var i = 0; i < this.state.el; i++) {
    //   idArray.push(this.state.antallEl[i].id)
    // }


  }

}
