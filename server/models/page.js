const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sortAuthors = function(a, b){
  //negative if a before b
  //0 if unchanged order
  //position if a after b
  return b.name - a.name;
};

const sortPublications = function(a, b){
  if(b.date === a.date) return a.title - b.title;
  return b.date - a.date;
};

const sortNews = function(a, b){
  if(b.date === a.date) return a.title - b.title;
  return b.date - a.date;
};

const HomeSchema = new Schema({
  carousel: {type: Array, default: ["http://media1.britannica.com/eb-media/19/128619-004-9B4972E1.jpg",
    "https://static.wixstatic.com/media/94b393_34d8d7fa6dc94d19840615aaa1b18d19~mv2.jpg",
    "http://www.ghschildrens.org/myimages/img_0267.jpg"]},
  summary: {type: String, default:"Lomo distillery man bun put a bird on it asymmetrical, hoodie air plant authentic narwhal humblebrag food truck pickled edison bulb. Man bun lyft activated charcoal, vegan 90's sartorial stumptown live-edge DIY. Tousled etsy craft beer lumbersexual tacos, hoodie butcher art party readymade. Vice lumbersexual adaptogen vinyl ethical small batch. VHS chicharrones gluten-free, vinyl man bun yr pop-up lyft normcore master cleanse asymmetrical art party. Jean shorts narwhal live-edge, enamel pin meh synth street art brooklyn typewriter. Lo-fi mixtape banjo, lomo gochujang bicycle rights retro scenester butcher single-origin coffee la croix lumbersexual pour-over kombucha."},
});


const AuthorSchema = new Schema({
  image: {type: String, default: "http://www.belmont.edu/pt/images/headshots/DarrMedium2.jpg"},
  summary: {type: String, default: "Semiotics pinterest DIY beard, cold-pressed kombucha vape meh flexitarian YOLO cronut subway tile gastropub. Trust fund 90's small batch, skateboard cornhole deep v actually before they sold out thundercats XOXO celiac meditation lomo hexagon tofu. Skateboard air plant narwhal, everyday carry waistcoat pop-up pinterest kitsch. Man bun vape banh mi, palo santo kinfolk sustainable selfies pug meditation kale chips organic PBR&B vegan pok pok. Lomo flexitarian viral yr man braid vexillologist. Bushwick williamsburg bicycle rights, sriracha succulents godard single-origin coffee fam activated charcoal."},
  education: {type: String, default: "Venmo 8-bit chambray thundercats. Jianbing drinking vinegar vinyl brunch, blog pop-up flexitarian plaid ramps quinoa food truck pok pok man bun taxidermy. "},
  name: {type: String, default: "Full Name"}
});

const PublicationsSchema = new Schema({
  title: {type: String, default: "Title"},
  description: {type: String, default: "Shoreditch 90's kombucha, VHS godard kitsch lumbersexual sartorial raw denim. Fanny pack freegan yuccie asymmetrical, actually cronut leggings offal iPhone selvage. "},
  authors: {type: Array, default: ["Nancy Darr", "Mary Rose"]},
  link: {type: String, default: "#"},
  date: {type: Date, default: Date.now}
});

const NewsSchema = new Schema({
  createdAt: {type:Date, default:Date.now},
  title: {type:String, default:"Title"},
  description: {type: String, default:"Plaid live-edge yr, meh put a bird on it enamel pin godard cornhole drinking vinegar banh mi flannel pug. Art party fixie lo-fi shabby chic forage. Meh craft beer blog, chicharrones small batch knausgaard flexitarian ugh banh mi. Occupy tattooed franzen, actually unicorn umami synth. Tacos godard kickstarter shaman cred pour-over. Offal pickled trust fund beard letterpress asymmetrical post-ironic jean shorts. Ethical shabby chic vape deep v vice woke af."},
  image: {type: String, default:"http://www.latascausa.com/site/wp-content/uploads/2013/10/Tile-Dark-Grey-Smaller-White-97.png"}
});


const PageSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  home: {type:[HomeSchema], default:[HomeSchema]},
  authors: {type:[AuthorSchema], default:[AuthorSchema, AuthorSchema]},
  publications: {type:[PublicationsSchema], default:[PublicationsSchema]},
  news: {type:[NewsSchema], default:[NewsSchema]}
});

// authenticate input against database documents
PageSchema.statics.authenticate = function(username, password, callback) {
  Page.findOne({ username: username })
      .exec(function (error, user) {
        if (error) {
          return callback(error);
        }
        else if ( !user ) {
          let err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password , function(error, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
}

// hash password before saving to database
PageSchema.pre('save', function(next) {
  const page = this;
  if(page.password.length <= 16){
    bcrypt.hash(page.password, 10, function(err, hash) {
      if (err) {
        return next(err);
      }
      page.password = hash;
      next();
    })
  }
  else{
    if(page.authors !== undefined) page.authors.sort(sortAuthors);
    if(page.publications !== undefined) page.publications.sort(sortPublications);
    if(page.news !== undefined) page.news.sort(sortNews);
    next();
  }
});


const Page = mongoose.model("Page", PageSchema);
module.exports.Page = Page;
