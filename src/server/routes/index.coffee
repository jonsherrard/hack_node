#
# * GET home page.
# 
exports.index = (req, res) ->
  res.render "bootstrap",
      title: "Date Find"