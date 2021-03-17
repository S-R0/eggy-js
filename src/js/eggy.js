/*!
 * Eggy JS 1.0.0
*/

class Builder {

    //Constructor
    constructor(userOptions){
        //Build our default options
        this.options = {
            ...this.buildDefaultOptions(userOptions),
            ...userOptions
        };
    }


    /**
     * Create a new toast
     * 
     * @return {Promise}
    */
    async create(){
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
    async build(){
        //Create one
        let wrapper = await this.createWrapper();
        //Create the toast
        let toast = await this.createToast();
        //Put the toast in the wrapper
        wrapper.appendChild(toast);
        //Resolve
        return toast;
    }


    /**
     * Create the toast element
     * 
     * @return {Promise} 
    */
    async createToast(){
        //Create the element
        let toast = document.createElement('div'),
            innerWrapper = document.createElement('div');
        //Generate a random toast id
        toast.setAttribute('id', 'eggy-'+Math.random().toString(36).substr(2, 4));
        //Set toast attributes
        toast.classList.add(this.options.type);
        //Are we adding a title?
        if(this.options.title){
            let title = document.createElement('p');
            title.classList.add('title');
            title.innerHTML = this.options.title;
            innerWrapper.appendChild(title);
        }
        //Are we adding a message?
        if(this.options.message){
            let message = document.createElement('p');
            message.classList.add('message');
            message.innerHTML = this.options.message;
            innerWrapper.appendChild(message);
        }
        //Append the icon, inner wrapper and close btn to the toast
        toast.innerHTML = await this.getIconContent();
        toast.appendChild(innerWrapper);
        toast.innerHTML += await this.getCloseBtnContent();
        //Are we adding a progress bar?
        if(this.options.progressBar){
            toast = this.addProgressBarToToast(toast);
        }
        //Return it
        return toast;
    }


    /**
     * Destroy the toast, remove it!
     * 
     * @param {HTMLElement} toast - The toast element we're removing
     * @return {Promise}
    */
    async destroyToast(toast){
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
    async bindings(toast){
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
    async createWrapper(){
        //Return an existing wrapper if it exists
        let wrapper = await this.isAlreadyOpen();
        if(!wrapper){
            //Create the element
            wrapper = document.createElement('div');
            //Set its attributes
            wrapper.classList.add('eggy', this.options.position);
            //Append it to the page and return it
            document.querySelector('body').appendChild(wrapper);
        }
        //Return it
        return wrapper;
    }


    /**
     * Check if there is already a toast initialised in the specified position
     * 
     * @return {Promise} The wrapper if it exists, false if it doesnt
    */
    async isAlreadyOpen(){
        //Get the wrapper
        let wrapper = document.querySelector(`.eggy.${this.options.position}`);
        return (wrapper ? wrapper : false);
    }
    

    /**
     * Get the icons content
     * 
     * @return {Promise}
    */
    async getIconContent(){
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
    async getCloseBtnContent(){
        return '{{ICON_CLOSE}}';
    }


    /**
     * Add the mandatory styling to the page
     * 
     * @return {Promise}
    */
    async addStyling(){
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
    async addTheme(){
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


    /**
     * Add a progress bar to a toast
     * 
     * @param {HTMLElement} toast - Toast we're adding a progress bar to
     * @return {Promise}
    */
    async addProgressBarToToast(toast){
        //Build our HTML
        let progressBar = document.createElement('span');
        //Get the duration
        let duration = this.options.duration / 1000;
        //Add our classes
        progressBar.classList.add('progress-bar');
        toast.appendChild(progressBar);
        //Add our styles
        if(this.options.styles){
            //Get the toasts id
            let toast_id = toast.getAttribute('id'),
                progressBarStyles = document.createElement('style');
            //Build the content
            progressBarStyles.innerHTML = `{{CSS_PROGRESS_BAR}}`;
            progressBarStyles.innerHTML += `#${toast_id} > .progress-bar { animation-duration: ${duration}s }`;
            toast.appendChild(progressBarStyles);
        }
        //Append it to the toast
        //Return the toast
        return toast;
    }


    /**
     * Build the default options
     * 
     * @param {Object} userOptions The user options for any overwrites
     * @return {Object} An object of options
    */
    buildDefaultOptions(userOptions){
        let options = {
            position: 'top-right',
            type: 'success',
            styles: true,
            duration: 5000,
            progressBar: true
        }
        //Get our type
        let type = (userOptions != undefined) ? userOptions.type ?? options.type : options.type;
        switch(type){
            case 'success':
                //Default titles and messages if not set in user options
                options.title = 'Success!';
                options.message = 'Task successfully completed.';
            break;
            case 'info':
                //Default titles and messages if not set in user options
                options.title = 'Information';
                options.message = 'Please take note of this information.';
            break;
            case 'warning':
                //Default titles and messages if not set in user options
                options.title = 'Warning';
                options.message = 'Please be careful!';
            break;
            case 'error':
                //Default titles and messages if not set in user options
                options.title = 'Whoops!';
                options.message = 'Something wen\'t wrong, please try again!';
            break;
        }
        //Return
        return options;
    }

}

//Export the Eggy function for use
export const Eggy = async (options) => {
    //Start a new Eggy Toast
    let newBuild = new Builder(options);
    //Run the build
    return await newBuild.create();
}