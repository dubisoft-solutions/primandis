# Primandis #

Markup project created by XD design mockup. Demo [link](https://dubisoft-solutions.github.io/primandis/ "Demo project link")

The shop page support themes. To test the logic add to the shop page the following query parameter *?theme=yellow*
 - Blue theme [example](https://dubisoft-solutions.github.io/primandis/shop.html "Demo project link")
 - Yellow theme [example](https://dubisoft-solutions.github.io/primandis/shop.html?theme=yellow "Demo project link")

### Technologies ###

* Bootstrap 5
* SaaS
* Webpack
* gulp



## How to build the project? ##

### Install nodeenv ###

**nodeenv** used to isolate the node versions on the system 

    pip3 install nodeenv

Create a virtualenv with the 18 node version

    nodeenv -n 18.9.0 env

Active it 

    . env/bin/activate

### Install node modules ###

    npm install
    


### Build assets ###
    npm run build


### Run dev server ###

    npm run dev

