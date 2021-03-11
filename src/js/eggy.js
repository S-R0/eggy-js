/*!
 * Eggy JS 1.0.0
*/

class Builder {

    //Constructor
    constructor(userOptions){
        //Build our default options
        this.options = {...
            {
                title: 'Success',
                message: 'Task complete successfully!',
                position: 'top-right',
                type: 'success',
                styles: true,
                duration: 5000
            }, ...userOptions
        };
    }


    /**
     * Create a new toast
     * 
     * @return {Promise}
    */
    async create() {
        //Add our styling
        await Promise.all([
            this.addStyling(),
            this.addTheme()
        ]);
        //Build it
        let toast = await this.build();
        //Toast bindings
        await this.bindings(toast);
        //Once its buil, open it after a split second
        setTimeout(() => {
            toast.classList.add('open');
        }, 250);
        //Wait the specified time in the options then close it
        setTimeout(() => {
            this.destroyToast(toast);
        }, this.options.duration);
        //Done
        return toast;
    }


    /**
     * Build the popup
     * 
     * @return {Promise} HTMLElement The new toast
    */
    async build() {
        //Check if its already open
        let wrapper = await this.isAlreadyOpen();
        if(!wrapper){
            //Create one
            wrapper = await this.createWrapper();
        }
        //Create the toast
        let toast = await this.createToast();
        //Put the toast in the wrapper
        wrapper.appendChild(toast);
        //Add it to the page
        document.querySelector('body').appendChild(wrapper);
        //Resolve
        return toast;
    }


    /**
     * Create the toast element
     * 
     * @return {Promise} 
    */
    async createToast() {
        //Create the element
        let toast = document.createElement('div'),
            innerWrapper = document.createElement('div'),
            title = document.createElement('p'),
            message = document.createElement('p');
        //Set toast attributes
        toast.classList.add(this.options.type);
        //Set title attributes and content
        title.classList.add('title');
        title.innerHTML = this.options.title;
        //Set message attributes and content
        message.classList.add('message');
        message.innerHTML = this.options.message;
        //Set the svg content
        //Append the items to the inner wrapper
        innerWrapper.appendChild(title);
        innerWrapper.appendChild(message);
        //Append the icon, inner wrapper and close btn to the toast
        toast.innerHTML = await this.getIconContent();
        toast.appendChild(innerWrapper);
        toast.innerHTML += await this.getCloseBtnContent();
        //Return it
        return toast;
    }


    /**
     * Destroy the toast, remove it!
     * 
     * @param {HTMLElement} toast - The toast element we're removing
     * @return {Promise}
    */
    async destroyToast(toast) {
        //Add the closing class for smooth closing
        toast.classList.add('closing');
        //After 200ms (the length of the css animation plus a bit), remove it
        setTimeout(() => {
            // toast.remove();
        }, 450);
    }


    /**
     * Add all of the bindings for the toast
     * 
     * @param {HTMLElement} toast - The toast we're building the bindings for
     * @return {Promise}
    */
    async bindings(toast) {
        //Close btn
        toast.querySelector('.close-btn').addEventListener('click', async () => {
            this.destroyToast(toast);
        })
    }
    
    
    /**
     * Create the element that the toasts are wrapped in
     * 
     * @return {Promise} The wrapper HTML Element
    */
    async createWrapper() {
        //Create the element
        let wrapper = document.createElement('div');
        //Set its attributes
        wrapper.classList.add('eggy', this.options.position);
        //Return it
        return wrapper;
    }


    /**
     * Check if there is already a toast initialised in the specified position
     * 
     * @return {Promise} The wrapper if it exists, false if it doesnt
    */
    async isAlreadyOpen() {
        //Get the wrapper
        let wrapper = document.querySelector(`.eggy.${this.options.position}`);
        return (wrapper ? wrapper : false);
    }
    

    /**
     * Get the icons content
     * 
     * @return {Promise}
    */
    async getIconContent() {
        //Switch the type
        switch(this.options.type){
            case 'success':
                return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.48 6.47998 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.47998 22 2 17.52 2 12ZM5 12L10 17L19 8L17.59 6.58L10 14.17L6.41003 10.59L5 12Z"></path></svg>';
            break;
            case 'warning':
                return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><g id="icon/alert/warning_24px"><path id="icon/alert/warning_24px_2" fill-rule="evenodd" clip-rule="evenodd" d="M19.53 20.5037C21.07 20.5037 22.03 18.8337 21.26 17.5037L13.73 4.49374C12.96 3.16375 11.04 3.16375 10.27 4.49374L2.74001 17.5037C1.96999 18.8337 2.93001 20.5037 4.46999 20.5037H19.53ZM12 13.5037C11.45 13.5037 11 13.0537 11 12.5037V10.5037C11 9.95376 11.45 9.50375 12 9.50375C12.55 9.50375 13 9.95376 13 10.5037V12.5037C13 13.0537 12.55 13.5037 12 13.5037ZM11 15.5037V17.5037H13V15.5037H11Z"></path></g></svg>';
            break;
            case 'error':
                return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><g id="icon/alert/error_24px"><path id="icon/alert/error_24px_2" fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47998 2 2 6.48001 2 12C2 17.52 6.47998 22 12 22C17.52 22 22 17.52 22 12C22 6.48001 17.52 2 12 2ZM12 13C11.45 13 11 12.55 11 12V8C11 7.45001 11.45 7 12 7C12.55 7 13 7.45001 13 8V12C13 12.55 12.55 13 12 13ZM11 15V17H13V15H11Z"></path></g></svg>';
            break;
        }
    }


    /**
     * Get the close content
     * 
     * @return {Promise}
    */
    async getCloseBtnContent() {
        return '<svg class="close-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><g id="icon/navigation/close_24px"><path id="icon/navigation/close_24px_2" d="M18.3 5.70999C18.1131 5.52273 17.8595 5.4175 17.595 5.4175C17.3305 5.4175 17.0768 5.52273 16.89 5.70999L12 10.59L7.10997 5.69999C6.92314 5.51273 6.66949 5.4075 6.40497 5.4075C6.14045 5.4075 5.8868 5.51273 5.69997 5.69999C5.30997 6.08999 5.30997 6.71999 5.69997 7.10999L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10999C18.68 6.72999 18.68 6.08999 18.3 5.70999Z"></path></g></svg>';
    }


    /**
     * Add the mandatory styling to the page
     * 
     * @return {Promise}
    */
    async addStyling() {
        //If there is no page styling already
        if(!document.querySelector('.eggy-styles')){
            //Create the style tag
            let styles = document.createElement('style');
            //Add a class
            styles.classList.add('eggy-styles');
            //Populate it
            styles.innerHTML = '.eggy{position:fixed;width:400px;max-width:90%;overflow:hidden;padding:1rem;top:0}.eggy,.eggy>div{box-sizing:border-box}.eggy>div{width:100%;transition:opacity .3s ease,left .2s ease,right .2s ease,max-height .4s,margin-top .4s,padding .4s;position:relative;opacity:0;max-height:200px;margin-top:10px;border-radius:4px;padding:.75rem 1rem;background:#fff;display:grid;grid-template-columns:1fr 5fr 1fr;grid-gap:.5rem;align-items:center}.eggy>div.open{opacity:1}.eggy>div.closing{max-height:0;opacity:0;margin-top:0;padding:0}.eggy.top-right{right:0}.eggy.top-right>div{right:-425px}.eggy.top-right>div.open{right:0}.eggy.top-left{left:0}.eggy.top-left>div{left:-425px}.eggy.top-left>div.open{left:0}';
            //Add to the head
            document.querySelector('head').appendChild(styles);
        }
        //Resolve
        return;
    }


    /**
     * Add the theme styling to the page
    */
    async addTheme() {
        //If there is no page styling already
        if(!document.querySelector('.eggy-theme') && this.options.styles){
            //Create the style tag
            let styles = document.createElement('style');
            //Add a class
            styles.classList.add('eggy-theme');
            //Populate it
            styles.innerHTML = '.eggy>div.success{border:2px solid #61c9a8}.eggy>div.success svg:first-of-type{fill:#61c9a8}.eggy>div.error{border:2px solid #d64550}.eggy>div.error svg:first-of-type{fill:#d64550}.eggy>div.warning{border:2px solid #ed9b40}.eggy>div.warning svg:first-of-type{fill:#ed9b40}.eggy>div svg:first-of-type{width:30px}.eggy>div svg:last-of-type{width:25px;fill:#8d8d8d;justify-self:center;cursor:pointer}.eggy>div>div .message,.eggy>div>div .title{margin:.1rem 0;color:#404040}.eggy>div>div .message.title,.eggy>div>div .title.title{font-weight:700;font-size:.9rem}.eggy>div>div .message.message,.eggy>div>div .title.message{font-weight:400;font-size:.8rem}';
            //Add to the head
            document.querySelector('head').appendChild(styles);
        }
        //Resolve
        return;
    }
}

//Export the Eggy function for use
export const Eggy = async (options) => {
    //Start a new Eggy Toast
    let newBuild = new Builder(options);
    //Run the build
    return await newBuild.create();
}