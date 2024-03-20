(function() {
  function getQueryParamValue(key) {
    // Get the full URL of the current script
    var scriptSrc = document.currentScript.src;

    // Find the position of the "?" character in the URL
    var queryParamsIndex = scriptSrc.indexOf("?");

    if (queryParamsIndex !== -1) {
      // Extract the query string from the URL
      var queryString = scriptSrc.substring(queryParamsIndex + 1);

      // Split the query string into individual parameters
      var paramPairs = queryString.split("&");

      // Loop through each parameter pair and check if the key matches
      for (var i = 0; i < paramPairs.length; i++) {
        var pair = paramPairs[i].split("=");
        var paramName = decodeURIComponent(pair[0]);
        var paramValue = decodeURIComponent(pair[1]);

        if (paramName === key) {
          return paramValue;
        }
      }
    }

    // If the key is not found, return null or any default value as per your requirement
    return null;
  }

  function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
  }

  addStyle(`
*, ::after, ::before {
box-sizing: border-box;
}

svg {
vertical-align: middle;
}

.scAI-chat-bubble {
display: inline-block;
font-weight: 400;
line-height: 1.5;
color: #212529;
text-align: center;
text-decoration: none;
vertical-align: middle;
cursor: pointer;
-webkit-user-select: none;
-moz-user-select: none;
user-select: none;
color: white;
background-color:black;
transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
filter: drop-shadow(rgba(0, 0, 0, 0.06) 0px 1px 6px) drop-shadow(rgba(0, 0, 0, 0.16) 0px 2px 32px);
z-index: 1001;
height: 48px;
width: 48px;
border-radius: 50rem !important;
font-size: 1.125rem;
padding: 0;
transition: transform 250ms cubic-bezier(0.33, 0, 0, 1) 0s;
}
.scAI-chat-bubble:hover{
transform: scale(1.1) !important;
}
.scAI-chat-bubble .icon {
border-radius: 50% !important;
display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  height: 100%;
  width: 100%;
  position: relative;
}

.scAI-chat-bubble .feather {
stroke: currentColor;
stroke-width: 2;
stroke-linecap: round;
stroke-linejoin: round;
fill: none;
}

.scAI-chat-bubble .feather-icon {
line-height: 0 !important;
}

.scAI-chat-bubble .feather-icon > svg {
height: 24px;
width: 24px;
}

.scAI-chat-bubble {
position: fixed;
right: 20px;
bottom: 20px;
z-index: 11111;
}

.scAI-chat-bubble.bottom-left,
.scAI-chat-window-iframe.bottom-left {
right: auto;
left: 20px;
}

.scAI-chat-bubble.bottom-right,
.scAI-chat-window-iframe.bottom-right {
left: auto;
right: 20px;
}

.scAI-chat-bubble-icon {
position: absolute;
 transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
 top: 50%;
 left: 50%;
}

.scAI-chat-bubble.open .scAI-chat-bubble-open-btn {
 opacity: 0;
 transform: translate(-50%, -50%) rotate(-90deg);
}

.scAI-chat-bubble:not(.open) .scAI-chat-bubble-close-btn {
 opacity: 0;
 transform: translate(-50%, -50%) rotate(90deg);
}

.scAI-chat-bubble:not(.open) .scAI-chat-bubble-open-btn,
.scAI-chat-bubble.open .scAI-chat-bubble-close-btn {
 opacity: 1;
 transform: translate(-50%, -50%) rotate(0deg);
}

@media (prefers-reduced-motion: reduce) {
.scAI-chat-bubble {
  transition: none;
}
}

.scAI-chat-bubble:hover {
color: white;
}

.scAI-chat-bubble:focus {
outline: 0;
box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25);
}

.scAI-chat-bubble:disabled {
pointer-events: none;
opacity: .65;
}

.scAI-chat-window-iframe {
  z-index: 100000;
  border: 1px solid #cccccc !important;
  position: fixed;
  bottom: 84px;
  right: 20px;
  height: 0;
  min-height: 0;
  width: 0;
  max-height: 0;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 40px;
  border-radius: 18px;
  overflow: hidden;
  opacity: 1;
  transform-origin: right bottom;
  transition: width 200ms ease 0s, height 200ms ease 0s, max-height 200ms ease 0s, transform 300ms cubic-bezier(0, 1.2, 1, 1) 0s, opacity 83ms ease-out 0s;
  pointer-events: all;
}

.scAI-chat-window-preview-text {
  position: fixed; 
  bottom: 84px;
  right: 20px;
  
  display: none !important;
  
  font-size: 14px;
  padding: 4px 12px;
  background-color: red;
  border-radius: 6px;
  color: #fff;
}

.scAI-chat-window-iframe {
  --chat-window-max-height: 550px;
  --chat-window-max-width: 400px;
}

.scAI-chat-window-iframe.small {
  --chat-window-max-height: 550px;
  --chat-window-max-width: 350px;
}

.scAI-chat-window-iframe.large {
  --chat-window-max-height: 750px;
  --chat-window-max-width: 500px;
}

.scAI-chat-window-iframe.show {
  height: min(var(--chat-window-max-height), 100% - 104px);
  min-height: 80px;
  width: var(--chat-window-max-width);
  max-height: var(--chat-window-max-height);
}

.d-none { display: none; }

@media (max-width: 768px) { 
 .scAI-chat-window-iframe {
    bottom: 0 !important;
    left: auto !important;
    top: auto !important;
    right: 0 !important;
    width: 0;
    height: 0;
    max-height: 0;
    border-radius: 0;
  }
  
  .scAI-chat-window-iframe.bottom-left {
    left: 0 !important;
    right: auto !important;
   
  }
  
  .scAI-chat-window-iframe.show {
    width: 30%;
    height: 40%;
    max-height: 40%;
  }
}
`);

const imagePath= 'SIRIKA_FINAL_LOGO.png'
  const scAIButtonHTML = `
<div class="scAI-chat-bubble ">
<span class="icon" style='background-color:white'>

   

<img src='${window.embeddedChatbotConfig.domain}/SIRIKA_FINAL_LOGO.png' alt='logo' style='width:30px'></img>
</span>
</div>
`;

  function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
  }

  function isMobile () {
    return window.innerWidth < 1024;
  }

  function changeChatBubblePosition(widgetPosition) {
    const button = document.querySelector('.scAI-chat-bubble');
    const iframe = document.querySelector('.scAI-chat-window-iframe');
    if (widgetPosition) {
      const widgetPositionMap = {
        'bottom_left': 'bottom-left',
        'bottom_right': 'bottom-right',
      }
      button.classList.remove('bottom-left');
      button.classList.remove('bottom-right');
      button.classList.add(widgetPositionMap[widgetPosition]);

      iframe.classList.remove('bottom-left');
      iframe.classList.remove('bottom-right');
      iframe.classList.add(widgetPositionMap[widgetPosition]);
    }
  };

  function addOrUpdateSizeStyleTag(obj) {
    // Create or select the <style> tag

    let styleTag = document.getElementById('custom-bot-size');

    if (!styleTag) {
      // If the <style> tag doesn't exist, create it
      styleTag = document.createElement('style');
      styleTag.id = 'custom-bot-size';
      document.head.appendChild(styleTag);
    }

    if (!obj.width || !obj.height) {
      styleTag.textContent = '';
      return;
    }

    // Set the CSS variables in the <style> tag
    styleTag.textContent = `.scAI-chat-window-iframe {
        --chat-window-max-height: ${obj.height}px !important;
        --chat-window-max-width: ${obj.width}px !important;
      }`;
  }


  const mountId = getQueryParamValue('mountId');
  const defaultOpenFromParams = getQueryParamValue("open");
  const scAIID = '709ca09e-39f3-442d-82e2-b4e81140c516';
  const overrideOnlineStatus = getQueryParamValue("override_online_status");
  const isCustomizeWidget = getQueryParamValue("customize_widget");
  const initialQuery = getQueryParamValue("query");
  const mountElement = mountId ? document.getElementById(mountId) : undefined;

  const body = mountElement || document.querySelector('body');
  const buttonElement = createElementFromHTML(scAIButtonHTML);

  const wrapperItem = document.createElement('div');
  wrapperItem.classList.add('scAI-chat-wrapper');

  wrapperItem.appendChild(buttonElement);
  const button = document.querySelector('.scAI-chat-bubble');

  const previewTextElement = document.createElement('div');
  previewTextElement.classList.add('scAI-chat-window-preview-text', 'd-none');
  wrapperItem.appendChild(previewTextElement);

  window.addEventListener('message', () => {
    
    const button = document.querySelector('.scAI-chat-bubble');
    const iframe = document.querySelector('.scAI-chat-window-iframe');
    const previewTextElement = document.querySelector('.scAI-chat-window-preview-text');

    const data = event.data || {};

    if (!data.isscAIInternal) return;

    if (data.backgroundColor) {
      button.classList.remove('d-none');
      button.style.backgroundColor = data.backgroundColor;
    }

    changeChatBubblePosition(data?.generalSettings?.widget_position);

    if (data.minimize) {
      button.classList.remove('open');
      iframe.classList.remove('show');
    }

    if (data.isFirst) {
      //
    }

    if (data?.behaviour?.window_preview_text) {
      previewTextElement.textContent = data?.behaviour?.window_preview_text;
      previewTextElement.classList.remove('d-none');
    } else {
      previewTextElement.classList.add('d-none');
    }

    if (data?.generalSettings?.widget_size) {
      const sizeType = data?.generalSettings?.widget_size?.type;
      iframe.classList.remove('small');
      iframe.classList.remove('standard');
      iframe.classList.remove('large');
      iframe.classList.remove('custom');
      iframe.classList.add(sizeType);
      if (sizeType === 'custom') {
        addOrUpdateSizeStyleTag(data?.generalSettings?.widget_size);
      } else {
        addOrUpdateSizeStyleTag({});
      }
    }

    if (data?.behaviour) {
      if (data?.behaviour?.chat_window_open && !isMobile()) {
        openBotWindow();
      } else {
        closeBotWindow();
      }
    }

    if (data.isFirst && (defaultOpenFromParams || (data?.behaviour?.chat_window_open && !isMobile()))) {
      openBotWindow();
    }

    if (data.isFirst) {
      const event = new Event('__scAI_widget_loaded__');
      event.payload = {};
      document.dispatchEvent(event);
    }
  });

  let iframe = document.createElement('iframe');

  const queryParams = [];
  if (isMobile()) queryParams.push('mobile=true');
  if (isCustomizeWidget) queryParams.push('customize_widget=true');
  if (initialQuery!=='null') queryParams.push(`query=${initialQuery}`);
  if (overrideOnlineStatus) queryParams.push('override_online_status=true');
  const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
  const embeddedChatbotConfig = window.embeddedChatbotConfig || {};
  const chatbotId = embeddedChatbotConfig.chatbotId;
  const domain = embeddedChatbotConfig.domain;

  // Construct the src URL for the iframe
  iframe.src = `${domain}/${chatbotId}`;
  iframe.id = 'chat-iframe'
  iframe.classList.add('scAI-chat-window-iframe');

  wrapperItem.appendChild(iframe);
  body.appendChild(wrapperItem);

  function openBotWindow() {
    const i = document.querySelector('.scAI-chat-window-iframe');
    const b = document.querySelector('.scAI-chat-bubble');
    
    if (b.classList.contains('open')) {
      return;
    } else {
      b.classList.add('open');
      i.classList.add('show');
    }
  };

  function closeBotWindow() {
    const i = document.querySelector('.scAI-chat-window-iframe');
    const b = document.querySelector('.scAI-chat-bubble');

    if (b.classList.contains('open')) {
      b.classList.remove('open');
      i.classList.remove('show');
    } else {
      return;
    }
  }

  const toggleButton = document.querySelector('.scAI-chat-bubble');
  toggleButton.addEventListener('click', () => {
    toggleBotButton();
  });

  function toggleBotButton() {
    
    const i = document.querySelector('.scAI-chat-window-iframe');
    const b = document.querySelector('.scAI-chat-bubble');
    const iframe = document.getElementById('chat-iframe');

    if (b.classList.contains('open')) {
      b.classList.remove('open');
      i.classList.remove('show');
    } else {
      b.classList.add('open');
      i.classList.add('show');

      const message = {
        action: 'focusElement',
        elementId: 'standalone_chat_popup'
      };
      // iframe.contentWindow.postMessage(message, `http://localhost:3000/${queryString}`);
    }
  }
  const initializeUI = () => {
    // toggleButton();
  };

  document.addEventListener("DOMContentLoaded", initializeUI);
})();