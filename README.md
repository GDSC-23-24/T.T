

# 2023 GDSC Solution Challenge

<hr>

#  ⚠️. Problem
Most of the marine litter is generated on land or during fishing activities. This waste negatively affects the marine ecosystem, causing the marine animals to mistake plastic for food and eat it. Marine life may lose its ability to reproduce or die from organ damage caused by plastic consumption.



# 🎯. Targeted UN SDG’s
| <img src="https://blog.kakaocdn.net/dn/2i1yD/btqFofwQTBH/dyHsHkaaRkKmlH56WUMNSk/img.png"> | <img src="https://blog.kakaocdn.net/dn/DIkGr/btqFnOTXBXv/nKeNDCYBdZcme27xayn20k/img.png"> |
| ---- | ---- |
| <div align=center> `Goal 6` </div> | <div align=center> `Goal 14` </div> |


# ❓. What is T.T
T.T stands for Trash Tracker, which is a service to solve marine waste problems.
It is an app using a garbage tracking drone that aims to contribute to water quality management and marine biological system health.


# 🛠️. System Architecture
![TT 소프트웨어 아키텍처](https://github.com/GDSC-23-24/T.T/assets/69447192/4376da9d-e53f-4c83-936a-e3feb1c1c8ac)



# 💻. ERD
![TT ERD](https://github.com/GDSC-23-24/T.T/assets/69447192/8b3b9399-c6e2-46b1-89aa-00af78badc08)

# 🛰️. Tech Stack
[![](https://camo.githubusercontent.com/3803468498d4b21719aced19028e21a6da499a5612de47661042d22997d8e8af/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a6176612d3030373339363f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/3803468498d4b21719aced19028e21a6da499a5612de47661042d22997d8e8af/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a6176612d3030373339363f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661266c6f676f436f6c6f723d7768697465) [![](https://camo.githubusercontent.com/b908952ccc693aefea57c4f782dc41100366de07dee108f01cde69fd3c1e1bc1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f737072696e672d3644423333463f7374796c653d666f722d7468652d6261646765266c6f676f3d737072696e67266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/b908952ccc693aefea57c4f782dc41100366de07dee108f01cde69fd3c1e1bc1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f737072696e672d3644423333463f7374796c653d666f722d7468652d6261646765266c6f676f3d737072696e67266c6f676f436f6c6f723d7768697465) [![](https://camo.githubusercontent.com/133507ab6e034de9f138aac27b83a001d5f321dcb314e5545600ebf72bb91c87/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f537072696e6720426f6f742d3644423333463f7374796c653d666f722d7468652d6261646765266c6f676f3d737072696e6720626f6f74266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/133507ab6e034de9f138aac27b83a001d5f321dcb314e5545600ebf72bb91c87/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f537072696e6720426f6f742d3644423333463f7374796c653d666f722d7468652d6261646765266c6f676f3d737072696e6720626f6f74266c6f676f436f6c6f723d7768697465) [![](https://camo.githubusercontent.com/d61eb16e74c265915596a84a51d5b50229367ad16915ca42da51f1a021bb3750/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6d7973716c2d3434373941313f7374796c653d666f722d7468652d6261646765266c6f676f3d6d7973716c266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/d61eb16e74c265915596a84a51d5b50229367ad16915ca42da51f1a021bb3750/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6d7973716c2d3434373941313f7374796c653d666f722d7468652d6261646765266c6f676f3d6d7973716c266c6f676f436f6c6f723d7768697465) [![](https://camo.githubusercontent.com/ef976df158522e6edde5dda4e5d475d00671bf472d764991d6bcd4a85c046e3d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f537072696e672053656375726974792d3644423333463f7374796c653d666f722d7468652d6261646765266c6f676f3d737072696e677365637572697479266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/ef976df158522e6edde5dda4e5d475d00671bf472d764991d6bcd4a85c046e3d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f537072696e672053656375726974792d3644423333463f7374796c653d666f722d7468652d6261646765266c6f676f3d737072696e677365637572697479266c6f676f436f6c6f723d7768697465) [![](https://camo.githubusercontent.com/655121dc106ba3546ce23e3b40d6cbcd428b0164e6d25217853b7c30e480a93f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f737761676765722d3835454132443f7374796c653d666f722d7468652d6261646765266c6f676f3d73776167676572266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/655121dc106ba3546ce23e3b40d6cbcd428b0164e6d25217853b7c30e480a93f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f737761676765722d3835454132443f7374796c653d666f722d7468652d6261646765266c6f676f3d73776167676572266c6f676f436f6c6f723d7768697465)

 [![](https://camo.githubusercontent.com/51b1f0fee6317e8fd8f058edbf09e2b1536150a639ec6920df85ccc5f6cb9176/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5244532d3532374646463f7374796c653d666f722d7468652d6261646765266c6f676f3d416d617a6f6e20524453266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/51b1f0fee6317e8fd8f058edbf09e2b1536150a639ec6920df85ccc5f6cb9176/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5244532d3532374646463f7374796c653d666f722d7468652d6261646765266c6f676f3d416d617a6f6e20524453266c6f676f436f6c6f723d7768697465)[![](https://camo.githubusercontent.com/260107dae769f214c3bf23f2d5ed84b9e72bb843b70ef45c3996e55acc447865/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6669676d612d4632344531453f7374796c653d666f722d7468652d6261646765266c6f676f3d6669676d61266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/260107dae769f214c3bf23f2d5ed84b9e72bb843b70ef45c3996e55acc447865/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6669676d612d4632344531453f7374796c653d666f722d7468652d6261646765266c6f676f3d6669676d61266c6f676f436f6c6f723d7768697465)![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white) ![PyTorch](https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white)

[![](https://camo.githubusercontent.com/837b039bfeae926bbadf45553bf4522b279c9ccf60eba3fffa014cc84f37112e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746875622d3138313731373f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/837b039bfeae926bbadf45553bf4522b279c9ccf60eba3fffa014cc84f37112e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746875622d3138313731373f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d7768697465) [![](https://camo.githubusercontent.com/ccbdc29329afff39a4b077da431827477c1c0b3b8546e2ec570e8acd88bcc0fb/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769742d4630353033323f7374796c653d666f722d7468652d6261646765266c6f676f3d676974266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/ccbdc29329afff39a4b077da431827477c1c0b3b8546e2ec570e8acd88bcc0fb/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769742d4630353033323f7374796c653d666f722d7468652d6261646765266c6f676f3d676974266c6f676f436f6c6f723d7768697465) [![](https://camo.githubusercontent.com/c8820d740db3809eac6809b9da45c5178fdc41e97a6a433046a4a5c05b91ef93/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f74696f6e2d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d4e6f74696f6e266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/c8820d740db3809eac6809b9da45c5178fdc41e97a6a433046a4a5c05b91ef93/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f74696f6e2d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d4e6f74696f6e266c6f676f436f6c6f723d7768697465)

[![](https://camo.githubusercontent.com/d30449fa2dbae519940a0d08f0202996163310b8c6b9336480232cfb48d38286/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f68746d6c352d4533344632363f7374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/d30449fa2dbae519940a0d08f0202996163310b8c6b9336480232cfb48d38286/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f68746d6c352d4533344632363f7374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465) [![](https://camo.githubusercontent.com/f432d617c378401551c4ba1fa6670f2e4e4ec6676cf3b8370096f3f8b66554ee/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6373732d3135373242363f7374796c653d666f722d7468652d6261646765266c6f676f3d63737333266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/f432d617c378401551c4ba1fa6670f2e4e4ec6676cf3b8370096f3f8b66554ee/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6373732d3135373242363f7374796c653d666f722d7468652d6261646765266c6f676f3d63737333266c6f676f436f6c6f723d7768697465) [![](https://camo.githubusercontent.com/835ac33106b566924b6984fd422f9ce2ec7f07bf98906ee2f515034b1808c572/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a6176617363726970742d4637444631453f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b)](https://camo.githubusercontent.com/835ac33106b566924b6984fd422f9ce2ec7f07bf98906ee2f515034b1808c572/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a6176617363726970742d4637444631453f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b) ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)



# 🎥. Demo Video

[Demo Video](https://www.youtube.com/watch?v=klZVy4JgNh0)



# 👨‍👩‍👦. Contributors

|            | Backend                  | Frontend                | AI                    | Design                  |
|------------|-----------------------|-------------------------|----------------------|------------------------|
| **Name**   | 채승지     | 하윤지   | 이유빈       | 주연우     |
|    | Seungji Chae     | Yunji Ha   | Yubin Lee       | Yeonwoo Ju     |





# How to build Project

You can build it by referring to the setting.zip file in the setting folder of our repository.

jdk version : 17 <br>
sdk(api level) : 30 <br>
node -v : 18.18.2 <br>
