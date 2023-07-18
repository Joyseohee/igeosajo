export const getCookie = (name, options = null) => {
    const value = window.document.cookie.match(
      "(^|;) ?" + name + "=([^;]*)(;|$)"
    );
    return value ? value[2] : null;
  };
  