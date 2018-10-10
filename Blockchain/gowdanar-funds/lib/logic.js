/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.gtpl.mynetwork.TradeCard} trade
 * @transaction
 */
async function buyCard(trade) {
    if (trade.card.forTrade) {
      // If card is available for trade
      trade.card.owner = trade.newOwner;
      return getAssetRegistry("org.example.biznet.TradingCard")
        .then(assetRegistry => {
          return assetRegistry.update(trade.card); // Update the network registry
        })
        .then(() => {
          let event = getFactory().newEvent(
            "org.example.biznet",
            "TradeNotification"
          ); // Get a reference to the event specified in the modeling language
          event.card = trade.card;
          emit(event); // Fire off the event
        });
    }
  }