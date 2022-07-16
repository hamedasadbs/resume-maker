import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import style from "./pdf.module.scss";
import * as cookie from "./Middleware/Library/cookie";

class PDFFile extends React.Component {
  // const [dataset, setDataset] = useState(null);
  state = {
    dataset: null,
  };

  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://localhost:8080/preview?username=${cookie.getCookie("username")}`
  //     )
  //     .then((res) => {
  //       setthis.state.Dataset(res.data.this.state.dataset);
  //     });
  // }, []);

  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/preview?username=${cookie.getCookie("username")}`
      )
      .then((res) => {
        // setDataset(res.data.dataset);
        this.setState.dataset = res.data.dataset;
      });
  }

  thStyle = {
    fontFamily: "Anton",
    fontWeight: "normal",
    fontStyle: "normal",
  };

  /*render component*/
  render() {
    return (
      <main className={style.divToPrint} id="divToPrint">
        <table style={this.thStyle} className="table">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Product A</th>
              <th>Product B</th>
              <th>Product C</th>
              <th>Product D</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Company A</td>
              <td>5</td>
              <td>6</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Company B</td>
              <td>1</td>
              <td>5</td>
              <td>2</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Company C</td>
              <td>1</td>
              <td>6</td>
              <td>8</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Company D</td>
              <td>1</td>
              <td>2</td>
              <td>0</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Company E</td>
              <td>3</td>
              <td>0</td>
              <td>3</td>
              <td>0</td>
            </tr>
            <tr>
              <td>
                <strong>Gross Total</strong>
              </td>
              <td>11</td>
              <td>19</td>
              <td>14</td>
              <td>12</td>
            </tr>
          </tbody>
          <caption>Previously sold products</caption>
        </table>
      </main>
    );
  }
}

export default PDFFile;
