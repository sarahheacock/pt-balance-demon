
//================page info=======================================================
export const blogID = "593d5eca1e17e126ddff6d0a";
export const cloudName = "dhd1eov8v";

//================possible error messages=======================================
export const errorStatus = {
  expError: "Session expired. Log back in again to continue.",
  deleteError: "You cannot delete all entries. Deleting all entries will cause errors",
  messageError: 'Unable to send message',
  formError: '* Fill out required fields',
  loadError: "Unable to load data",
  loginError: "Username and/or password not found.",
  messageSuccess: 'Message Sent! We will get back to you as soon as possible.'
}

//================page initial state when loaded==================================
export const initialData = {
  home: [],
  authors: [],
  publications: [],
  news: []
};
export const initialMessage = '';
export const initialUser = {
  username: '',
  password: '',
  admin: false,
  token: ""
};
export const initialEdit = {
	modalTitle: '',
	url: '',
	dataObj: {} // will be copy of data we want to edit
};


// export const pageRoutes = [...Object.keys(initialData), 'login'];

//===============info on user message form=========================================
const defaultImage = 'Tile-Dark-Grey-Smaller-White-97_pxf5ux'

export const defaultData = {
  home: {
    summary: '',
    carousel: [defaultImage],
  },
  authors: {
    name: '',
    education: '',
    summary: '',
    image: defaultImage,
  },
  publications: {
    title: '',
    description: '',
    authors: [''],
    date: '',
    link: '',
  },
  news: {
    title: '',
    description: '',
    image: defaultImage,
  }
}

export const formData = {
  // carousel: {
  //   type: 'file',
  //   placeholder: 'Upload Rotating Image',
  //   componentClass: 'input'
  // },
  summary: {
    type: 'text',
    placeholder: 'Summary',
    componentClass: 'textarea'
  },
  // image: {
  //   type: 'file',
  //   placeholder: 'Upload Image',
  //   componentClass: 'input'
  // },
  education: {
    type: 'text',
    placeholder: 'Education (Bold Text)',
    componentClass: 'input'
  },
  name: {
    type: 'text',
    placeholder: 'Full Name',
    componentClass: 'input'
  },
  title: {
    type: 'text',
    placeholder: 'Section Title',
    componentClass: 'input'
  },
  description: {
    type: 'text',
    placeholder: 'Summary',
    componentClass: 'textarea'
  },
  authors: {
    type: 'text',
    placeholder: 'Published Author',
    componentClass: 'input'
  },
  link: {
    type: 'text',
    placeholder: 'Link to Article',
    componentClass: 'input'
  },
  date: {
    type: 'text',
    placeholder: 'Date Published',
    componentClass: 'input'
  }
}

export const loginData = {
  username: {
    type: 'text',
    placeholder: 'Admin Username',
    componentClass: 'input'
  },
  password: {
    type: 'password',
    placeholder: 'Password',
    componentClass: 'input'
  },
}

export const messageData = {
  name: {
    type: 'text',
    placeholder: 'Your Name',
    componentClass: 'input'
  },
  email: {
    type: 'email',
    placeholder: 'Email Address',
    componentClass: 'input'
  },
  phone: {
    type: 'text',
    placeholder: 'Phone Number',
    componentClass: 'input'
  },
  message: {
    type: 'text',
    placeholder: 'Message',
    componentClass: 'textarea'
  }
};


export const links = {
  github: 'https://github.com/sarahheacock',
  fcc: 'https://www.freecodecamp.org/sarahheacock',
  linkedin: 'https://www.linkedin.com/in/sarah-heacock-ab8677126'
};
