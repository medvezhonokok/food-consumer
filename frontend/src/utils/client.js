class Client {
    constructor() {
        this.baseUrl = process.env.REACT_APP_SERVER_URL
        if (!this.baseUrl) {
            this.baseUrl = ''
        }
    }

    async get(url: string, p: ?{}) {
        return this._fetch("GET", url + "?" + this._objectToParamsString(p))
    }
    async post(url: string, p: ?{}) {
        return this.postJson(url, p)
    }

    async postJson(url: string, p: {}) {
        return this._fetch("POST", url, 'application/json', JSON.stringify(p))
    }

    async postParams(url, p) {
        return this._fetch("POST", url, 'application/x-www-form-urlencoded', this._objectToParamsString(p))
    }

    async del(url, p) {
        return this._fetch("DELETE", url + "/" + p)
    }

    _objectToParamsString(p: {}) {
        if (!p) return ""

        return Object.keys(p).reduce((s, k) => s + (s === "" ? "" : "&") + k + "=" + encodeURIComponent(p[k]), "")
    }

    async _fetch(method: string, url: string, contentType: ?string, body: ?string) {
        let error = null
        let res = null
        if (!url.startsWith("/")) {
            url = "/" + url
        }
        try {
            let params = {
                method: method,
                credentials: 'include'
            }

            if (contentType) {
                params['headers'] = {
                    'Content-Type': contentType
                }
            }

            if (body) {
                params['body'] = body
            }

            res = await fetch(this.baseUrl + url, params)
            if (res.ok) {
                if (res.headers.get("Content-Type") === 'application/json') {
                    return await res.json()
                } else {
                    return res.text()
                }
            }
        } catch (e) {
            this._showError(e.message);
            throw e
        }

        if (!!error) {
            this._showError(error);
            throw error
        }
    }

    _showError(text: string) {
        //    todo implement
        alert(`error: ${text}`)
    }
}

export default new Client()