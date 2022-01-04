import { Component } from '@angular/core';
import { environment } from './../environments/environment';

declare var Moralis;
Moralis.start({ serverUrl: environment.server_url, appId: environment.app_id });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = '### BTC Indonesia ###';
  public user: string;
  public isLoggedIn = false;
  public createdAt: string;
  public updatedAt: string;
  public ethAddress: string;
  public isAuthenticated = false;


  // Login
  async login() {
    this.user = await Moralis.User.current();
    if (!this.user) {
      let user = await Moralis.authenticate();
      console.log("login ==> ", user);
      this.createdAt = user.createdAt;
      this.updatedAt = user.updatedAt;
      this.ethAddress = user.attributes.ethAddress;
    }
    this.isLoggedIn = true;
  }

  // Logout
  async logOut() {
    await Moralis.User.logOut();
    console.log("logged out ==>");
    this.isLoggedIn = false;


  }

  async donasi() {
    // sending 0.5 ETH
    const options = { type: "native", amount: Moralis.Units.ETH("0.5"), receiver: "0xa56D47733bdcBDf73f16c10951E91F1cb6dfe648" }
    let result = await Moralis.transfer(options)
    return result;
  }

}
