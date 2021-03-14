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
        //Generate a random toast id
        toast.setAttribute('id', 'eggy-'+Math.random().toString(36).substr(2, 4));
        //Set toast attributes
        toast.classList.add(this.options.type);
        //Set title attributes and content
        title.classList.add('title');
        title.innerHTML = this.options.title;
        //Set message attributes and content
        message.classList.add('message');
        message.innerHTML = this.options.message;
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
            toast.remove();
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
                return '{{ICON_SUCCESS}}';
            break;
            case 'info':
                return '{{ICON_INFO}}';
            break;
            case 'warning':
                return '{{ICON_WARNING}}';
            break;
            case 'error':
                return '{{ICON_ERROR}}';
            break;
        }
    }


    /**
     * Get the close content
     * 
     * @return {Promise}
    */
    async getCloseBtnContent() {
        return '{{ICON_CLOSE}}';
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
            styles.innerHTML = '{{CSS_STYLES}}';
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
            styles.innerHTML = '{{CSS_THEME}}';
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