const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
  detay: {
    type:String,
    required: true
  },

  title: {
    type:String,
    required: true
  },
  hadi: {
    type: String,
    required: true

  },
  iletisim: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
})

articleSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }

  if (this.iletisim) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.iletisim))
  }

  next()
})

module.exports = mongoose.model('Article', articleSchema)