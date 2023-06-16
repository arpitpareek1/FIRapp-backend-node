import pool from "./db"
import { Response, Request } from "express"

export const login = (req: Request, res: Response) => {
  let data = req.body
  const { email, password } = data
  let sql = `SELECT * from user where email = "${email}"`
  pool.query(sql, (err: any, data: any) => {
    if (data && data.length > 0) {
      if (data[0].password === password) {
        let res1 = {
          "data": data,
          'success': true
        }
        res.status(200).send(res1);
      } else {
        {
          let res1 = {
            "data": 'password not found',
            'success': false
          }
          res.status(200).send(res1);
        }
      }
    } else {
      let res1 = {
        "data": 'email not found',
        'success': false
      }
      res.status(200).send(res1);
    }


  })

}

export function getallfir(req: Request, res: Response) {
  let sql = "SELECT * from incident"
  pool.query(sql, (err: any, data: any) => {
    if (data) {
      let response = {
        "data": data,
        'success': true
      }
      res.status(200).send(response);
    } else {
      let response = {
        error: err
      }
      res.status(200).send(response);
    }
  })
}

export const signup = (req: Request, res: Response) => {
  let data = req.body
  const { username, password, number, email, role } = data
  let sql = `SELECT * from user where email = ?`
  pool.query(sql, [email], (err: any, data1: any) => {
    if (data1.length > 0) {
      let response = {
        "resullt": 'user already have account',
        'success': false
      }
      res.status(200).send(response);
    } else {
      let sql = `INSERT INTO user (name, email, number, password, role)
       VALUES ('${username}', '${email}', '${number}', '${password}', '${role}');
       `
      try {
        pool.query(sql, (err: any, data1: any) => {
          if (data) {
            let response = {
              "data": data,
              'success': true
            }
            res.status(200).send(response);
          } else {
            res.status(200).send(err);
          }
        })
      } catch (error) {
        res.status(200).send(error);
      }

    }
  })
}

export const craeteFir = (req: Request, res: Response) => {
  let data = req.body
  const {
    date,
    time,
    fullName,
    contactNumber,
    address,
    incidentDate,
    incidentTime,
    location,
    incidentType,
    incidentDescription,
    witnessName,
    witnessContactNumber,
    witnessAddress,
    id
  } = data

  let sql = `INSERT INTO incident (date, userid, time, fullName, contactNumber, address, incidentDate, incidentTime, location, incidentType, incidentDescription, witnessName, witnessContactNumber, witnessAddress, status) VALUES ( '${date}',${id}, '${time}','${fullName}','${contactNumber}','${address}','${incidentDate}','${incidentTime}','${location}','${incidentType}','${incidentDescription}','${witnessName}','${witnessContactNumber}','${witnessAddress}', "pending")`

  pool.query(sql, (err: any, data: any) => {

    if (data) {
      let response = {
        'success': true
      }
      res.status(200).send(response);
    } else {
      let response = {
        'error': err,
        'success': false
      }
      res.status(200).send(response);
    }
  })
}
export const setStatusSolve = (req: Request, res: Response) =>{

   let id =  req.body.id
   let status =  req.body.status
  let sql = `UPDATE incident SET status = '${status}' WHERE id = ${id}`
  pool.query(sql, (err: any, data: any) => {
    if (data) {
      let response = {
        'success': true
      }
      res.status(200).send(response);
    } else {
      let response = {
        error: err
      }
      res.status(200).send(response);
    }
  })
}
export const myCompaines =(req: Request, res: Response)=>{
  const data = req.body 
  const {id } = data
  let sql = `select * from incident where userid = "${id}"`
  pool.query(sql, (err: any, data: any) => {
    if (data) {
      let response = {
        "data": data,
        'success': true
      }
      res.status(200).send(response);
    } else {
      let response = {
        error: err,
        'success': false
      }
      res.status(200).send(response);
    }
  })

}
