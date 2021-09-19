/** @type {import('next').NextConfig} */
const withPlugins = require( 'next-compose-plugins' )
const withSvgr = require( 'next-svgr' )

module.exports = withPlugins(
  [withSvgr],
  {
    reactStrictMode: true,
  }
)
