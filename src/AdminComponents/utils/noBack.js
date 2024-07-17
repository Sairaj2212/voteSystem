export const preventBackNavigation = () => {
    window.history.forward();
    window.onload = function () { 
      window.history.forward();
    };
    window.onpageshow = function (evt) { 
      if (evt.persisted) window.history.forward(); 
    };
    window.onunload = function () {};
  };
  