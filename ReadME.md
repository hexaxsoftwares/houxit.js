
## Houxer.js
#### The Transparent Web Framework for Perfectionists 

Welcome to Houxer, the modern sleek and robust web framework that empowers creative and productive development while Building web apps.


### Overview
**Houxer** (pronounced as `haùzer`) is a next-generation JavaScript framework, partly inspired by the elegance and success of Vue.js, with the design to streamline the creation of dynamic, reactive, and component-based web applications with unparalleled ease.

Through its intuitive API and clean architecture, Houxer empowers developers to craft interactive and complex UIs with simplicity, making it the framework of choice for modern web development.

### **Why Houxer?**

**Houxer** isn’t just another framework—it's a revolution. Combining the best practices of modern web development with innovative features. Houxer redefines how we build web applications, delivering high performance, modularity, and an unmatched developer experience.

**Some Key Features and Capabilities at a glance:**

- 🧊 **Component-driven architecture**: Craft reusable, modular components with ease through **Houxer Widgets**.
- 🕋 **Declarative templating**: Write clean and concise templates with Houxer intuitive templating syntax.
- 🛣️ **Two-way data binding**: Keep your data in sync with automatic updates.
- 📶 **Powerful state management system**: Manage your application's state with ease with a lightweight built-in statefull API or an external fully featured houx powered state management framework.
- 🌐 **Extensive ecosystem**: Leverage a growing community of developers and a wealth of plugins and tools.
- 📝 **Gentle learning curve**: Easy to learn, making it perfect for developers of all skill levels, from novices to experts.
- ⚡ **Optimized-performance**: Houxer is optimized for speed and efficiency, ensuring fast and seamless user experiences.
- 🚀 **Flexible and adaptable**: Designed to fit your needs. You can Seamlessly integrate with other libraries , frameworks and existing projects, or use it standalone for new projects..
- 📲 **Virtual DOM**: Optimized performance with a virtual DOM that minimizes DOM mutations and ensures accuracy during DOM reconciliation transform.
- 🎯 **Smart Updates**: Update components only when necessary, reducing unnecessary re-renders.
- 🤽 **Context API**: Share data and functionality between widgets with a simple and efficient API.
- 🧩 **Community-driven**: Join a growing community of developers and contributors.
- 🔖 **Directives**: Extend HTML with custom behaviorial attributes.
- 🪐 **Lifecycle Hooks**: Execute code at precise and specific points in a component's and element's lifecycle.

**Building web applications has never been easier**

 Houxer focuses on maintainability, modularity, and reusability without sacrificing performance. Its strong foundation allows you to build complex web applications that are easy to maintain and extend.


🌐 **Rich Ecosystem**

Houxer offers a rich ecosystem of tools and libraries to support every phase of your application’s lifecycle. From a powerful templating engine to a robust routing system, Houxer provides everything you need to build fast, efficient, and scalable web applications.

🚇 **Convention over Configuration**

Houxer adheres to the principle of **convention over configuration**, letting you focus on what truly matters—building your application—while the framework handles the underlying details and plumbing.


🎗️ **Just the UI**

Houxer is designed to be focused on the view layer, making it easy to integrate with other backend logic or state management libraries, such as Redux or GraphQL, without any fuss.

📲 **Virtual DOM**

Houxer is optimized for performance and scalability, with a virtual DOM that minimizes DOM mutations and smart updates that only update components when necessary. This means your application will be fast and responsive, even with complex and dynamic user interfaces.

⚛️ **JSX**
 
 Enjoy the freedom of JSX support, allowing you to choose the rendering style that best suits your project's needs and your personal coding preferences.

💫 **TypeScript Support**

Out-of-the-box TypeScript support optimizes the development process and enhances debugging, making Houxer the ideal choice for modern, large-scale projects.





💪 **Getting Started**

Whether you're starting fresh or integrating into an existing project, Houxer makes it easy to get up and running. For a full-fledged experience, we recommend using the official scaffolding tool, **HouxerKit**.

Install HouxerKit via npm:

```bash
npm install init:houxerkit
```
Houxer Installation via npm

```bash
npm install houxer
```

For simpler integration, Houxer can be added directly to your project via jsdelivr:

```html
<script src="https://cdn.jsdelivr.net/gh/hexaxsoftwares/houxer.js@main/src/global/houxer.global.dev.js"></script>
```

If you prefer an esm-modules exported components

```html
<script src="https://cdn.jsdelivr.net/gh/hexaxsoftwares/houxer.js@main/src/houxer.module.js"></script>
```

via unpkg
```html
<script src="https://unpkg.com/houxer@0.1.3/src/houxer.module.js"></script>
```
Check the Installation guide for detailed Installation information.

##### Basic Usage

Here’s a simple example to get you started:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Houxer.js Example</title>
  <script src="https://cdn.jsdelivr.net/gh/hexaxsoftwares/houxer.js@main/houxer.global.dev.js"></script>
</head>
<body>
  <div id="app">
    <p>{{ message }}</p>
  </div>

  <script>
    Houxer.initBuild({
      model:function(){
        this.message= 'Hello, Houxer.js!'
      }
    }).mount('#app');
    //You will have to call the .mount(selector or DOM node) to get rendered to the DOM
  </script>
</body>
</html>
```

This example demonstrates how to create a basic Houxer instance and bind data to the DOM.

##### Widgets

Widgets are reusable pieces of your UI. Define an initial entrypoint widget build by calling the `Houxer.initBuild()` method: and then registering other child widgets with the `initBuild.widget()` call.

```javascript
Houxer.initBuild({
  model:function(){
    this.message= 'Hello, Houxer.js!'
  }
}).widget('my-widget', {
  template: '<div>A custom widget!</div>'
}).mount('#app');
```

Use your widget in the DOM within the mount root:

```html
<my-widget></my-widget>
```

##### Reactivity System

Houxer uses a reactive data system to update the DOM when your data changes. When you modify the data, the framework automatically re-renders the affected parts of the UI.  
Here is a simple counter app that updates a count once the button updates the counter prop through an inline event listener.
```javascript
Houxer.initBuild({
  model:function(){
    this.count = 0
  }
}).mount('#app')
```
Usage in templates
```html
<!--in Dom templates-->
<div id='app'>
  <button $$on:click='count++' > I'm clicked {{ count }} times </button>
</div>
```

##### Directives

Directives are special tokens in the markup that tell the library to do something to a DOM element or widget instance. Common directives include:

- `$$bind`: Bind a value to an element's attribute.
- `$$on`: Attach an event listener to an element.

Example:

```html
<button $$on:click="increment">Click me</button>
```
> Directives are denoted by prepending a double dollar sign (`$$`) to an attribue.

## Event Handling

Houxer makes it easy to handle user events. Define methods in your widget and use the `$$on` directive to attach it to an actual houxer element vnode:

```javascript
Houxer.initBuild({
  model:function(){
    this.count= 0
  },
  handlers: {
    increment() {
      this.count++;
    }
  }
}).mount('#app);
```
Usage in template
```html
<button $$on:click="increment">Click me</button>
```

##### Data Binding

Houxer supports both one-way and two-way data binding. Use the `$$model` directive for two-way data binding with form elements:

```html
<input $$model="message">
```

## Lifecycle Hooks

Houxer provides several lifecycle hooks that allow you to run code at specific stages of a widget's life:

- `postBuild`: Called after the instance and vnodes are created.
- `onWatch`:Called when effect watch is installed
- `postMount`: Called after the instance is mounted.
- `onEffect`:Called once a reactive effect is triggered.
- `postUpdate`: Called after the instance's data is updated.
- `postDestroy`: Called after the instance is destroyed.
- etc....

Example:

```javascript
Houxer.initBuild({
  model:function() {
    this.message= 'Hello!'
  },
  postBuild:function() {
    console.log('Instance created!');
  }
});
```
This merely scratches the surface, contact the lifecycle hooks API for more hooks.

#### Advanced Topics

##### Custom Directives

You can create custom directives to encapsulate reusable behavior:

```javascript
Houxer.initBuild({
  //widget options
}).directive('focus', {
  created:function(vnode, value, modifiers ) {
    el.$element.focus();
  }
});
// registered using the initBuild().directive() call
```
To be used the same way with builtin Directives

##### Plugins

Extend Houxer functionality with plugins. A plugin is a function that adds an app level functionality to your build:

```javascript

Houxer.initBuild({
  //options
}).install({
  plugin:function(build, options){
    
  }
}, {
  //plugin options
});
```
This is meant to be an overview, contact the houxer documentation and guides for more explainatory and detailed information.

Ready to experience the power of Houxer? Get started with our comprehensive documentation, tutorials, and example projects.

- **Documentation**: [insert link]
- **Tutorials**: [insert link]
- **Example Projects**: [insert link]

Houxer is inspired by the success of Vue framework system and builds upon the shoulders of giants in the web development community. We're grateful for the contributions and innovations that have paved the way for Houxer.

**Join the Community**

Houxer is an open-source project with a growing community of developers and contributors. Join us on GitHub, Forum, and Discord to get involved and help shape the future of web development.

- [GitHub](https//:www.github.com/hexaxsoftwares/houxer.js)
- Forum: [N/A]
- Discord: [N/A]


**Contributions**

We welcome contributions from the community. To get involved, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.


**License**

Houxer is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

Begin your journey with Houxer by joining the community today and exploring its core features and understanding how it simplifies the complexities of modern web development. With Houxer, you can focus on creating exceptional user experiences while the framework takes care of the underlying details.

Discover the elegance of Houxer and elevate your web development projects to new heights by starting your next web project with houxer.
