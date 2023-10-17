interface ResponseToken {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface ResponseTokenWithoutRefresh {
  access_token: string;
  token_type: string;
  expires_in: number;
}
