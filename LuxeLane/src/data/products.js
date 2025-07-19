// Product image imports
import silkDressImg from '../assets/A luxurious silk dress for special occasions..jpg';
import whiteShirtImg from '../assets/A timeless white shirt made from premium cotton..jpg';
import blackPantsImg from '../assets/Elegant black pants with a perfect fit for any occasion..jpg';
import goldHeelsImg from '../assets/High-heeled shoes with gold accents for a touch of luxury..jpg';
import leatherToteImg from '../assets/A spacious and stylish beige leather tote bag..jpg';
import pearlEarringsImg from '../assets/Elegant pearl drop earrings for a sophisticated look..jpg';
import chiffonGownImg from '../assets/A flowing chiffon gown perfect for evening events..jpg';
import cashmereSweaterImg from '../assets/Soft cashmere sweater for ultimate comfort and style..jpg';
import slimJeansImg from '../assets/Modern slim fit jeans with a luxury touch..jpg';
import suedeLoafersImg from '../assets/Comfortable and stylish suede loafers.jpg';
import crossbodyBagImg from '../assets/A chic mini crossbody bag for essentials..jpg';

// Additional product images
import chelseaBootsImg from '../assets/Premium Leather Chelsea Boots.jpg';
import stilettoHeelsImg from '../assets/Elegant Stiletto Heels.jpg';
import runnerSneakersImg from '../assets/Sporty Runner Sneakers.jpg';
import beachSlidesImg from '../assets/Casual Beach Slides.jpg';
import zipHoodieImg from '../assets/Zip-Up Hoodie with Moisture-Wicking Fabric women.jpg';
import compressionShortsImg from '../assets/Compression Shorts.jpg';
import workoutTankImg from '../assets/Seamless Workout Tank.jpg';
import sportsBraImg from '../assets/Sports Bra with Mesh Detailing.jpg';
import leggingsImg from '../assets/High-Waisted Leggings.jpg';
import swimsuitImg from '../assets/Sporty Zip-Up Swimsuit.jpg';
import bikiniImg from '../assets/Ruffled Off-Shoulder Bikini.jpg';
import triangleBikiniImg from '../assets/Triangle Bikini Top with Matching Bottoms.jpg';
import monokiniImg from '../assets/One-Piece Monokini with Cut-Outs.jpg';
import espadrillesImg from '../assets/Slip-On Espadrilles.jpg';
import coverUpImg from '../assets/Swimsuit Cover-Up Dress.jpg';
import fedoraHatImg from '../assets/Straw Fedora Hat.jpg';
import cropTopImg from '../assets/Tie-Front Crop Top.jpg';
import culottesImg from '../assets/Wide-Legged Culottes.jpg';
import linenShirtImg from '../assets/Button-Down Linen Shirt.jpg';
import maxiSkirtImg from '../assets/Wrap-Style Maxi Skirt.jpg';
import bermudaShortsImg from '../assets/High-Waisted Bermuda Shorts.jpg';
import tankTopImg from '../assets/Ribbed Tank Top.jpg';
import goldNecklaceImg from '../assets/Chunky Gold Chain Necklace.jpg';
import sunglassesImg from '../assets/Oversized Sunglasses.jpg';
import strawHatImg from '../assets/Wide Brim Straw Hat.jpg';
import ankleBootsImg from '../assets/Leather Ankle Boots.jpg';
import flannelShirtImg from '../assets/Plaid Flannel Shirt.jpg';
import cargoJoggersImg from '../assets/Cargo Joggers.jpg';
import buttonShirtImg from '../assets/Slim-fit Button-Down Shirt.jpg';
import pulloverSweaterImg from '../assets/Cashmere Pullover Sweater.jpg';
import graphicTeeImg from '../assets/Graphic Tee.jpg';
import bomberJacketImg from '../assets/Varsity Bomber Jacket.jpg';
import laceTopImg from '../assets/Bohemian Lace Top.jpg';
import tshirtDressImg from '../assets/Basic T-shirt Dress.jpg';
import tartanSkirtImg from '../assets/Plaid Tartan Mini Skirt.jpg';
import slipDressImg from '../assets/V-neck Satin Slip Dress.jpg';
import bodysuitImg from '../assets/Bodysuit with Cut-Out Detail.jpg';
import aLineSkirtImg from '../assets/A-Line Skirt.jpg';
import blazerImg from '../assets/Tailored Blazer.jpg';
import floralDressImg from '../assets/Maxi Floral Dress.jpg';
import knitSweaterImg from '../assets/Chunky Knit Sweater.jpg';

export const products = [
  {
    id: 1,
    name: 'Elegant Silk Dress',
    category: 'Dresses',
    price: 299,
    originalPrice: 399,
    image: silkDressImg,
    description: 'A luxurious silk dress for special occasions.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Gold', 'Black', 'Navy'],
    inStock: true,
    rating: 4.8,
    reviews: 24,
    featured: true
  },
  {
    id: 2,
    name: 'Classic White Shirt',
    category: 'Tops',
    price: 89,
    originalPrice: 110,
    image: whiteShirtImg,
    description: 'A timeless white shirt made from premium cotton.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Cream'],
    inStock: true,
    rating: 4.6,
    reviews: 18,
    featured: true
  },
  {
    id: 3,
    name: 'Tailored Black Pants',
    category: 'Pants',
    price: 149,
    originalPrice: 189,
    image: blackPantsImg,
    description: 'Elegant black pants with a perfect fit for any occasion.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Charcoal'],
    inStock: true,
    rating: 4.7,
    reviews: 31,
    featured: true
  },
  {
    id: 4,
    name: 'Gold Accent Heels',
    category: 'Shoes',
    price: 199,
    originalPrice: 249,
    image: goldHeelsImg,
    description: 'High-heeled shoes with gold accents for a touch of luxury.',
    sizes: ['35', '36', '37', '38', '39', '40', '41'],
    colors: ['Gold', 'Beige', 'Black'],
    inStock: true,
    rating: 4.5,
    reviews: 12,
    featured: false
  },
  {
    id: 5,
    name: 'Beige Leather Tote',
    category: 'Bags',
    price: 249,
    originalPrice: 299,
    image: leatherToteImg,
    description: 'A spacious and stylish beige leather tote bag.',
    sizes: ['One Size'],
    colors: ['Beige', 'Black', 'Brown'],
    inStock: true,
    rating: 4.3,
    reviews: 8,
    featured: false
  },
  {
    id: 6,
    name: 'Pearl Drop Earrings',
    category: 'Accessories',
    price: 79,
    originalPrice: 95,
    image: pearlEarringsImg,
    description: 'Elegant pearl drop earrings for a sophisticated look.',
    sizes: ['One Size'],
    colors: ['White Pearl', 'Gold', 'Silver'],
    inStock: true,
    rating: 4.9,
    reviews: 15,
    featured: true
  },
  {
    id: 7,
    name: 'Chiffon Evening Gown',
    category: 'Dresses',
    price: 399,
    originalPrice: 499,
    image: chiffonGownImg,
    description: 'A flowing chiffon gown perfect for evening events.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Champagne', 'Navy', 'Burgundy'],
    inStock: true,
    rating: 4.7,
    reviews: 9,
    featured: false
  },
  {
    id: 8,
    name: 'Cashmere Sweater',
    category: 'Tops',
    price: 159,
    originalPrice: 199,
    image: cashmereSweaterImg,
    description: 'Soft cashmere sweater for ultimate comfort and style.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Beige', 'White', 'Grey', 'Navy'],
    inStock: true,
    rating: 4.8,
    reviews: 22,
    featured: true
  },
  {
    id: 9,
    name: 'Slim Fit Jeans',
    category: 'Pants',
    price: 129,
    originalPrice: 159,
    image: slimJeansImg,
    description: 'Modern slim fit jeans with a luxury touch.',
    sizes: ['26', '27', '28', '29', '30', '31', '32', '33', '34'],
    colors: ['Dark Blue', 'Light Blue', 'Black', 'Grey'],
    inStock: true,
    rating: 4.5,
    reviews: 28,
    featured: true
  },
  {
    id: 10,
    name: 'Suede Loafers',
    category: 'Shoes',
    price: 179,
    originalPrice: 219,
    image: suedeLoafersImg,
    description: 'Comfortable and stylish suede loafers.',
    sizes: ['35', '36', '37', '38', '39', '40', '41', '42'],
    colors: ['Tan', 'Black', 'Navy'],
    inStock: true,
    rating: 4.4,
    reviews: 14,
    featured: false
  },
  {
    id: 11,
    name: 'Mini Crossbody Bag',
    category: 'Bags',
    price: 139,
    originalPrice: 169,
    image: crossbodyBagImg,
    description: 'A chic mini crossbody bag for essentials.',
    sizes: ['One Size'],
    colors: ['Black', 'Cognac', 'Pink'],
    inStock: true,
    rating: 4.6,
    reviews: 19,
    featured: false
  },
  // New Products Added
  {
    id: 12,
    name: 'Premium Leather Chelsea Boots',
    category: 'Shoes',
    price: 289,
    originalPrice: 349,
    image: chelseaBootsImg,
    description: 'Premium leather chelsea boots with elastic side panels for easy wear.',
    sizes: ['35', '36', '37', '38', '39', '40', '41', '42'],
    colors: ['Black', 'Brown', 'Tan'],
    inStock: true,
    rating: 4.7,
    reviews: 16,
    featured: true
  },
  {
    id: 13,
    name: 'Elegant Stiletto Heels',
    category: 'Shoes',
    price: 219,
    originalPrice: 269,
    image: stilettoHeelsImg,
    description: 'Elegant stiletto heels perfect for evening events and formal occasions.',
    sizes: ['35', '36', '37', '38', '39', '40', '41'],
    colors: ['Black', 'Nude', 'Red'],
    inStock: true,
    rating: 4.8,
    reviews: 23,
    featured: false
  },
  {
    id: 14,
    name: 'Sporty Runner Sneakers',
    category: 'Shoes',
    price: 159,
    originalPrice: 189,
    image: runnerSneakersImg,
    description: 'Comfortable and stylish runner sneakers for everyday wear.',
    sizes: ['35', '36', '37', '38', '39', '40', '41', '42'],
    colors: ['White', 'Black', 'Grey'],
    inStock: true,
    rating: 4.5,
    reviews: 31,
    featured: false
  },
  {
    id: 15,
    name: 'Casual Beach Slides',
    category: 'Shoes',
    price: 79,
    originalPrice: 99,
    image: beachSlidesImg,
    description: 'Comfortable beach slides perfect for summer and casual wear.',
    sizes: ['35', '36', '37', '38', '39', '40', '41'],
    colors: ['White', 'Black', 'Beige'],
    inStock: true,
    rating: 4.3,
    reviews: 12,
    featured: false
  },
  {
    id: 16,
    name: 'Zip-Up Performance Hoodie',
    category: 'Tops',
    price: 129,
    originalPrice: 159,
    image: zipHoodieImg,
    description: 'Moisture-wicking zip-up hoodie perfect for workouts and casual wear.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Grey', 'Navy'],
    inStock: true,
    rating: 4.6,
    reviews: 18,
    featured: false
  },
  {
    id: 17,
    name: 'High-Waisted Compression Shorts',
    category: 'Pants',
    price: 89,
    originalPrice: 109,
    image: compressionShortsImg,
    description: 'High-waisted compression shorts for optimal comfort during workouts.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Grey'],
    inStock: true,
    rating: 4.4,
    reviews: 15,
    featured: false
  },
  {
    id: 18,
    name: 'Seamless Workout Tank',
    category: 'Tops',
    price: 69,
    originalPrice: 89,
    image: workoutTankImg,
    description: 'Seamless workout tank with moisture-wicking technology.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'White'],
    inStock: true,
    rating: 4.5,
    reviews: 22,
    featured: false
  },
  {
    id: 19,
    name: 'Sports Bra with Mesh Detailing',
    category: 'Tops',
    price: 79,
    originalPrice: 99,
    image: sportsBraImg,
    description: 'High-support sports bra with stylish mesh detailing.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Navy'],
    inStock: true,
    rating: 4.7,
    reviews: 19,
    featured: false
  },
  {
    id: 20,
    name: 'High-Waisted Leggings',
    category: 'Pants',
    price: 99,
    originalPrice: 129,
    image: leggingsImg,
    description: 'High-waisted leggings with compression technology for workouts.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Grey'],
    inStock: true,
    rating: 4.6,
    reviews: 25,
    featured: false
  },
  {
    id: 21,
    name: 'Sporty Zip-Up Swimsuit',
    category: 'Swimwear',
    price: 119,
    originalPrice: 149,
    image: swimsuitImg,
    description: 'Sporty zip-up swimsuit perfect for active beach days.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Red'],
    inStock: true,
    rating: 4.5,
    reviews: 14,
    featured: false
  },
  {
    id: 22,
    name: 'Ruffled Off-Shoulder Bikini',
    category: 'Swimwear',
    price: 139,
    originalPrice: 169,
    image: bikiniImg,
    description: 'Stylish ruffled off-shoulder bikini for a flattering beach look.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Pink'],
    inStock: true,
    rating: 4.8,
    reviews: 21,
    featured: true
  },
  {
    id: 23,
    name: 'Triangle Bikini Set',
    category: 'Swimwear',
    price: 129,
    originalPrice: 159,
    image: triangleBikiniImg,
    description: 'Classic triangle bikini set with matching bottoms.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Red', 'Blue'],
    inStock: true,
    rating: 4.6,
    reviews: 17,
    featured: false
  },
  {
    id: 24,
    name: 'One-Piece Monokini',
    category: 'Swimwear',
    price: 149,
    originalPrice: 179,
    image: monokiniImg,
    description: 'Elegant one-piece monokini with cut-out details.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Red'],
    inStock: true,
    rating: 4.7,
    reviews: 13,
    featured: false
  },
  {
    id: 25,
    name: 'Slip-On Espadrilles',
    category: 'Shoes',
    price: 99,
    originalPrice: 129,
    image: espadrillesImg,
    description: 'Comfortable slip-on espadrilles perfect for summer.',
    sizes: ['35', '36', '37', '38', '39', '40', '41'],
    colors: ['Beige', 'Black', 'White'],
    inStock: true,
    rating: 4.4,
    reviews: 11,
    featured: false
  },
  {
    id: 26,
    name: 'Swimsuit Cover-Up Dress',
    category: 'Dresses',
    price: 89,
    originalPrice: 119,
    image: coverUpImg,
    description: 'Elegant swimsuit cover-up dress for beach to street style.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Beige'],
    inStock: true,
    rating: 4.3,
    reviews: 9,
    featured: false
  },
  {
    id: 27,
    name: 'Straw Fedora Hat',
    category: 'Accessories',
    price: 59,
    originalPrice: 79,
    image: fedoraHatImg,
    description: 'Classic straw fedora hat for sun protection and style.',
    sizes: ['One Size'],
    colors: ['Natural', 'Black', 'Beige'],
    inStock: true,
    rating: 4.5,
    reviews: 16,
    featured: false
  },
  {
    id: 28,
    name: 'Tie-Front Crop Top',
    category: 'Tops',
    price: 79,
    originalPrice: 99,
    image: cropTopImg,
    description: 'Stylish tie-front crop top perfect for summer styling.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Pink'],
    inStock: true,
    rating: 4.6,
    reviews: 14,
    featured: false
  },
  {
    id: 29,
    name: 'Wide-Legged Culottes',
    category: 'Pants',
    price: 139,
    originalPrice: 169,
    image: culottesImg,
    description: 'Elegant wide-legged culottes for a sophisticated look.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Beige'],
    inStock: true,
    rating: 4.7,
    reviews: 12,
    featured: false
  },
  {
    id: 30,
    name: 'Button-Down Linen Shirt',
    category: 'Tops',
    price: 109,
    originalPrice: 139,
    image: linenShirtImg,
    description: 'Breathable button-down linen shirt perfect for summer.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Beige', 'Light Blue'],
    inStock: true,
    rating: 4.5,
    reviews: 18,
    featured: false
  },
  {
    id: 31,
    name: 'Wrap-Style Maxi Skirt',
    category: 'Pants',
    price: 119,
    originalPrice: 149,
    image: maxiSkirtImg,
    description: 'Elegant wrap-style maxi skirt for a flowing silhouette.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    inStock: true,
    rating: 4.6,
    reviews: 11,
    featured: false
  },
  {
    id: 32,
    name: 'High-Waisted Bermuda Shorts',
    category: 'Pants',
    price: 99,
    originalPrice: 129,
    image: bermudaShortsImg,
    description: 'Comfortable high-waisted bermuda shorts for casual wear.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Khaki', 'Navy', 'Black'],
    inStock: true,
    rating: 4.4,
    reviews: 13,
    featured: false
  },
  {
    id: 33,
    name: 'Ribbed Tank Top',
    category: 'Tops',
    price: 49,
    originalPrice: 69,
    image: tankTopImg,
    description: 'Comfortable ribbed tank top for everyday wear.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Grey'],
    inStock: true,
    rating: 4.3,
    reviews: 20,
    featured: false
  },
  {
    id: 34,
    name: 'Chunky Gold Chain Necklace',
    category: 'Accessories',
    price: 89,
    originalPrice: 119,
    image: goldNecklaceImg,
    description: 'Statement chunky gold chain necklace for bold styling.',
    sizes: ['One Size'],
    colors: ['Gold', 'Silver', 'Rose Gold'],
    inStock: true,
    rating: 4.8,
    reviews: 25,
    featured: true
  },
  {
    id: 35,
    name: 'Oversized Sunglasses',
    category: 'Accessories',
    price: 129,
    originalPrice: 159,
    image: sunglassesImg,
    description: 'Stylish oversized sunglasses for sun protection and glamour.',
    sizes: ['One Size'],
    colors: ['Black', 'Tortoise', 'Clear'],
    inStock: true,
    rating: 4.6,
    reviews: 19,
    featured: false
  },
  {
    id: 36,
    name: 'Wide Brim Straw Hat',
    category: 'Accessories',
    price: 79,
    originalPrice: 99,
    image: strawHatImg,
    description: 'Elegant wide brim straw hat for beach and summer styling.',
    sizes: ['One Size'],
    colors: ['Natural', 'Black', 'Beige'],
    inStock: true,
    rating: 4.5,
    reviews: 14,
    featured: false
  },
  {
    id: 37,
    name: 'Leather Ankle Boots',
    category: 'Shoes',
    price: 199,
    originalPrice: 249,
    image: ankleBootsImg,
    description: 'Classic leather ankle boots for versatile styling.',
    sizes: ['35', '36', '37', '38', '39', '40', '41'],
    colors: ['Black', 'Brown', 'Tan'],
    inStock: true,
    rating: 4.7,
    reviews: 22,
    featured: false
  },
  {
    id: 38,
    name: 'Plaid Flannel Shirt',
    category: 'Tops',
    price: 89,
    originalPrice: 119,
    image: flannelShirtImg,
    description: 'Classic plaid flannel shirt for casual and layered looks.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red Plaid', 'Blue Plaid', 'Green Plaid'],
    inStock: true,
    rating: 4.4,
    reviews: 16,
    featured: false
  },
  {
    id: 39,
    name: 'Cargo Joggers',
    category: 'Pants',
    price: 109,
    originalPrice: 139,
    image: cargoJoggersImg,
    description: 'Comfortable cargo joggers with functional pockets.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Khaki', 'Black', 'Olive'],
    inStock: true,
    rating: 4.3,
    reviews: 12,
    featured: false
  },
  {
    id: 40,
    name: 'Slim-fit Button-Down Shirt',
    category: 'Tops',
    price: 99,
    originalPrice: 129,
    image: buttonShirtImg,
    description: 'Professional slim-fit button-down shirt for work and casual wear.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Pink'],
    inStock: true,
    rating: 4.6,
    reviews: 18,
    featured: false
  },
  {
    id: 41,
    name: 'Cashmere Pullover Sweater',
    category: 'Tops',
    price: 179,
    originalPrice: 219,
    image: pulloverSweaterImg,
    description: 'Luxurious cashmere pullover sweater for ultimate comfort.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Grey', 'Navy'],
    inStock: true,
    rating: 4.8,
    reviews: 24,
    featured: true
  },
  {
    id: 42,
    name: 'Graphic Tee',
    category: 'Tops',
    price: 49,
    originalPrice: 69,
    image: graphicTeeImg,
    description: 'Stylish graphic tee with unique designs for casual wear.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Grey'],
    inStock: true,
    rating: 4.4,
    reviews: 15,
    featured: false
  },
  {
    id: 43,
    name: 'Varsity Bomber Jacket',
    category: 'Tops',
    price: 159,
    originalPrice: 199,
    image: bomberJacketImg,
    description: 'Classic varsity bomber jacket for a sporty and stylish look.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Red'],
    inStock: true,
    rating: 4.7,
    reviews: 20,
    featured: false
  },
  {
    id: 44,
    name: 'Bohemian Lace Top',
    category: 'Tops',
    price: 119,
    originalPrice: 149,
    image: laceTopImg,
    description: 'Elegant bohemian lace top for romantic and feminine styling.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Ivory'],
    inStock: true,
    rating: 4.6,
    reviews: 17,
    featured: false
  },
  {
    id: 45,
    name: 'Basic T-shirt Dress',
    category: 'Dresses',
    price: 79,
    originalPrice: 99,
    image: tshirtDressImg,
    description: 'Comfortable basic t-shirt dress for easy everyday styling.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Grey'],
    inStock: true,
    rating: 4.5,
    reviews: 21,
    featured: false
  },
  {
    id: 46,
    name: 'Plaid Tartan Mini Skirt',
    category: 'Pants',
    price: 89,
    originalPrice: 119,
    image: tartanSkirtImg,
    description: 'Classic plaid tartan mini skirt for preppy and stylish looks.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Red Plaid', 'Blue Plaid', 'Green Plaid'],
    inStock: true,
    rating: 4.4,
    reviews: 13,
    featured: false
  },
  {
    id: 47,
    name: 'V-neck Satin Slip Dress',
    category: 'Dresses',
    price: 149,
    originalPrice: 189,
    image: slipDressImg,
    description: 'Elegant v-neck satin slip dress for evening events.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    inStock: true,
    rating: 4.8,
    reviews: 19,
    featured: true
  },
  {
    id: 48,
    name: 'Bodysuit with Cut-Out Detail',
    category: 'Tops',
    price: 99,
    originalPrice: 129,
    image: bodysuitImg,
    description: 'Stylish bodysuit with cut-out details for a modern look.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy'],
    inStock: true,
    rating: 4.6,
    reviews: 16,
    featured: false
  },
  {
    id: 49,
    name: 'A-Line Skirt',
    category: 'Pants',
    price: 109,
    originalPrice: 139,
    image: aLineSkirtImg,
    description: 'Flattering a-line skirt for a classic and feminine silhouette.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Beige'],
    inStock: true,
    rating: 4.5,
    reviews: 14,
    featured: false
  },
  {
    id: 50,
    name: 'Tailored Blazer',
    category: 'Tops',
    price: 199,
    originalPrice: 249,
    image: blazerImg,
    description: 'Professional tailored blazer for work and formal occasions.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Grey'],
    inStock: true,
    rating: 4.7,
    reviews: 23,
    featured: true
  },
  {
    id: 51,
    name: 'Maxi Floral Dress',
    category: 'Dresses',
    price: 169,
    originalPrice: 209,
    image: floralDressImg,
    description: 'Beautiful maxi floral dress perfect for summer and special occasions.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blue Floral', 'Pink Floral', 'White Floral'],
    inStock: true,
    rating: 4.8,
    reviews: 26,
    featured: true
  },
  {
    id: 52,
    name: 'Chunky Knit Sweater',
    category: 'Tops',
    price: 139,
    originalPrice: 179,
    image: knitSweaterImg,
    description: 'Cozy chunky knit sweater for cold weather comfort.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Grey', 'Cream'],
    inStock: true,
    rating: 4.6,
    reviews: 20,
    featured: false
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'Dresses', name: 'Dresses' },
  { id: 'Tops', name: 'Tops' },
  { id: 'Pants', name: 'Pants' },
  { id: 'Shoes', name: 'Shoes' },
  { id: 'Bags', name: 'Bags' },
  { id: 'Accessories', name: 'Accessories' },
  { id: 'Swimwear', name: 'Swimwear' }
];

export const getProductsByCategory = (category) => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
}; 